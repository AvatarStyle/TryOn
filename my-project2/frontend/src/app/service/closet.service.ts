import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ClosetResponse} from "src/app/component/member/closet/closet-response.model";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ClosetService {

  constructor(private http: HttpClient) { }


  addToCloset(username: string, productId: string) {
    const url = 'https://tryon-399311.du.r.appspot.com/closet/add'; // API endpoint
    return this.http.post(url, { username, productId });
  }

  getCloset(username: string){
    const url = `https://tryon-399311.du.r.appspot.com/closet/${username}`;
    return this.http.get<ClosetResponse>(url);
  }

  removeFromCloset(id: string): Observable<any> {
    const url = `https://tryon-399311.du.r.appspot.com/closet/remove/${id}`; // API endpoint
    return this.http.delete(url, { responseType: 'text' }); // Expect a text response
  }

  addToClosetAPI(item){
    const url = 'https://tryon-399311.du.r.appspot.com/closet/apiAdd';

    return this.http.post(url, item);
  }
}
