import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  firebaseUrl:string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    this.http.post<{name:string}>(this.firebaseUrl, 
    postData
    ).subscribe(responseData => {
      console.log(responseData);
    });

  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.http.get<{[key:string]:Post}>(this.firebaseUrl)
    .pipe(
      map((responseData) => { 
        const postsArray:Post[] = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            postsArray.push({...responseData[key], id: key});
          }
        }
        return postsArray;
      })
    )
    .subscribe((posts) => {
      this.loadedPosts = posts;
    });
  }
}
