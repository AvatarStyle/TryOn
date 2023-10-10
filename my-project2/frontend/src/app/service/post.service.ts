import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private http: HttpClient) { }

  getPost(id: string): Observable<any> {
    return this.http.get(`https://tryon-399311.du.r.appspot.com/posts/postId/${id}`);
  }
}
