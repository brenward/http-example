import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map } from "rxjs/operators";

@Injectable({providedIn:'root'})
export class PostsService{
    firebaseUrl:string = '';

    constructor(private http:HttpClient){}

    creatAndStorePost(title:string, content:string){
        const postData:Post = {title:title,content:content};
        this.http.post<{name:string}>(this.firebaseUrl, 
            postData
            ).subscribe(responseData => {
              console.log(responseData);
            });
    }

    fetchPosts(){
        return this.http.get<{[key:string]:Post}>(this.firebaseUrl)
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
            );
    }

    deletePosts(){        
        return this.http.delete(this.firebaseUrl);
    }
}