import { Component } from '@angular/core';
import { SignService } from "./service/rest-api/sign.service";
import {DataService} from "./service/data.service";
import {HomeComponent} from "./component/home.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //template: '{{ data }}'
})
export class AppComponent {
  title = 'frontend';
  data: any;

  //속하는 url을 추가하면 동일한 설정값을 적용해준다.
  HomeList =[""];
  SignUpList = ['signUp'];
  MainList=['signin','fitting'];
  ProductList=['product'];
  CommunityList=['community'];



  username1 = localStorage.getItem('username');
  loginForm: FormGroup; //form 인스턴스로 로그인 폼 정보 관리

  TopNav;
  BottomNav;
  ThisComponent;
  searchInput: string;


  constructor(
    public signService: SignService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      uid: "",
      password: ""
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // urlAfterRedirects 값으로 currentUrl 업데이트
      this.ThisComponent = event.urlAfterRedirects.split('/')[1];
      this.setNav();
    });

    this.searchInput = '';
  }



  setNav(){
    if(this.MainList.includes(this.ThisComponent)){
      this.TopNav=true;
      this.BottomNav=true;
    }else if(this.ProductList.includes(this.ThisComponent)){
      this.TopNav=true;
      this.BottomNav=false;
    }else if(this.CommunityList.includes(this.ThisComponent)){
      this.TopNav=true;
      this.BottomNav=true;
    }else if(this.SignUpList.includes(this.ThisComponent)){
      this.TopNav=false;
      this.BottomNav=false;
    } else if(this.HomeList.includes(this.ThisComponent)) {
      //홈일때 널값을 가진다.
      this.TopNav=true;
      this.BottomNav=true;
    }
  }




  onLogin(){
    const loginData = this.loginForm.value;

    this.signService.login(loginData).subscribe(
      (response) => {
        console.log(response);
      },
      (error)=>{
        console.error(error);
      }
    );
  }

  logout(){
    localStorage.removeItem('username');
  }

  /*ngOnInit(){
    this.dataService.getData().subscribe((data) =>(this.data = data));
  }*/

}
