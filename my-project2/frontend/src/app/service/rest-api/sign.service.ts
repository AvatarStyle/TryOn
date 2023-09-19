import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SignService {
  private _username: BehaviorSubject<string>;


  constructor(private http: HttpClient,
              private router: Router,
              private location: Location) {
    this._username = new BehaviorSubject<string>("");
    const savedUsername = localStorage.getItem('username');
    this._username = new BehaviorSubject<string>(savedUsername || "");
    //this.checkSignInStatus();
  }

  get username(): Observable<string> {
    return this._username.asObservable();
  }

  /*checkSignInStatus() {
    this.http.get<boolean>('http://localhost:8080/users/isSignedIn').subscribe(
      (response) => {
        if (response) {
          // 로그인 상태인 경우 사용자 이름을 가져올 수 있는 API 호출 등 추가적인 처리 가능
          this.fetchUsername();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  fetchUsername() {
    // 사용자 이름을 가져오는 API 호출 및 처리
    // 예시로는 '/users/username' 엔드포인트를 가정하고 GET 요청하는 것으로 작성하였습니다.
    this.http.get<string>('http://localhost:8080/users/username').subscribe(
      (response) => {
        if (typeof response === 'string') { // 유효한 사용자 이름인 경우에만 업데이트
          this._username.next(response);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }*/



  login(loginData: any): Observable<any> {
    return this.http.post('https://tryon-399311.du.r.appspot.com/users/login', loginData).pipe(
      tap((response: any) => {
        if (response.message === "로그인에 성공 했습니다") {
          const username = response.username;
          if (typeof username === 'string') {
            this._username.next(username);
            console.log('Username updated:', username);
            // 로그인 성공 시 사용자 이름을 localStorage에 저장
            localStorage.setItem('username', username);
          }
        }
      })
    );
  }

  logout() {
      localStorage.removeItem('username');
      location.reload();
/*    return this.http.post('http://localhost:8080/users/logout', {}).pipe(
      tap(() => {
        // 로그아웃 시 localStorage에서 사용자 이름 제거
        localStorage.removeItem('username');
      })
    );*/
  }

  signup(signUpData: any){
    return this.http.post('https://tryon-399311.du.r.appspot.com/users/signup', signUpData, { observe: 'response' }).pipe(
      tap((response) => {
        if (response.status === 201 && response.body === "Signup successful") {
          this.location.back();
        }
      })
    );
  }

  isSignIn(): boolean{
    return true;
  }
}
