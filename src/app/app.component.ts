import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isLoading = false;

  constructor(private http: HttpClient, private postsService:PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.fetchPosts().subscribe(posts =>{
      this.isLoading = false;
      this.loadedPosts = posts;
    });
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postsService.creatAndStorePost(postData.title, postData.content);   
  }

  onFetchPosts() {
    this.isLoading = true;
    this.postsService.fetchPosts().subscribe(posts =>{
      this.isLoading = false;
      this.loadedPosts = posts;
    });
  }

  onClearPosts() {
    // Send Http request
  }

}
