import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { catchError, map } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({providedIn:'root'})
export class PostsService{
    firebaseUrl:string = '';
    error = new Subject<string>();

    constructor(private http:HttpClient){}

    creatAndStorePost(title:string, content:string){
        const postData:Post = {title:title,content:content};
        this.http.post<{name:string}>(this.firebaseUrl, 
            postData
            ).subscribe(responseData => {
              console.log(responseData);
            },
            error =>{
                this.error.next(error.message);
            });
    }

    fetchPosts(){
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print','pretty');
        searchParams = searchParams.append('custom','key');

        return this.http.get<{[key:string]:Post}>(this.firebaseUrl, {
            headers: new HttpHeaders({'Custom-Header':'Hello'}),
            params: searchParams
        })
        .pipe(
            map((responseData) => { 
            const postsArray:Post[] = [];
            for(const key in responseData){
            if(responseData.hasOwnProperty(key)){
                postsArray.push({...responseData[key], id: key});
            }
            }
            return postsArray;
        }),
        catchError(errorResponse => {
            //log error or something
            return throwError(errorResponse);
        }));
    }

    deletePosts(){        
        return this.http.delete(this.firebaseUrl);
    }
}