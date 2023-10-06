import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./modules/material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import { HomeComponent } from './component/home.component';
import { SigninComponent } from './component/member/signin/signin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { SignupComponent } from './component/member/signup/signup.component';
import {SignService} from "./service/rest-api/sign.service";
import { LogoutComponent } from './component/logout/logout.component';
import { MyinfoComponent } from './component/member/myinfo/myinfo.component';
import {HttpRequestInterceptorService} from "./service/rest-api/common/http-request-interceptor.service";
import {MyinfoService} from "./service/rest-api/myinfo.service";
import {MatInputModule} from "@angular/material/input";
import {IonicStorageModule} from "@ionic/storage-angular";
import { HeadComponent } from './head/head.component';
import { RegistComponent } from './component/product/regist/regist.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {DataService} from "./service/data.service";
import { DetailComponent } from './component/product/detail/detail.component';
import { MyavatarComponent } from './component/avatar/myavatar/myavatar.component';
import { FitMainComponent } from './component/fit/fit-main/fit-main.component';
import { ImageSearchComponent } from './component/fit/image-search/image-search.component';
import { DetectLabelsComponent } from './component/fit/detect/detect-labels/detect-labels.component';
import { FittingComponent } from './component/fitting/fitting/fitting.component';
import { ImageSliderComponent } from './component/image-slider/image-slider.component';
import { OverlayComponent } from './component/overlay/overlay.component';
import { ResultComponent } from './component/result/result.component';
import { ItemsComponent } from './component/items/items.component';
import { SearchComponent } from './component/search/search.component';
import { ManageComponent } from './component/product/manage/manage.component';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import { ClosetComponent } from './component/member/closet/closet.component';
import { CommunityComponent } from './component/community/community.component';
import { PostComponent } from './component/community/post/post.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    LogoutComponent,
    MyinfoComponent,
    HeadComponent,
    RegistComponent,
    DetailComponent,
    MyavatarComponent,
    FitMainComponent,
    ImageSearchComponent,
    DetectLabelsComponent,
    FittingComponent,
    ImageSliderComponent,
    OverlayComponent,
    ResultComponent,
    ItemsComponent,
    SearchComponent,
    ManageComponent,
    ClosetComponent,
    CommunityComponent,
    PostComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatInputModule,
        IonicStorageModule,
        MatSidenavModule,
        MatSnackBarModule
    ],
  exports: [
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptorService,
      multi: true
    },
    DataService,
    SignService,
    MyinfoService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
