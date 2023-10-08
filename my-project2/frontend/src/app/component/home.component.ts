import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {OverlayComponent} from "./overlay/overlay.component";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('changeImage', [
      state('firstAction', style({
        opacity: 0.1
      })),
      state('secondAction', style({
        opacity: 1.0
      })),
      transition('firstAction => secondAction', [
        animate('0.5s')
      ]),
      transition('secondAction => firstAction', [
        animate('0.5s')
      ])
    ])
  ]
})

export class HomeComponent implements OnInit, OnDestroy{

  @ViewChild('overlayComponent') overlayComponent: OverlayComponent;
  currentImageId: number = 0;
  imageRoot: String = "assets/sliderImage/"
  imageList: Array<String> = [
    this.imageRoot + "IMG_4124.PNG",
    this.imageRoot + "IMG_4125.PNG",
    this.imageRoot + "IMG_4126.PNG",
    this.imageRoot + "제목 7.png"
  ]

  
  currentIndices = [];
  posts = [];
  products=[];
  communities=[];
  brands1=[
    {path:'1',name:'필루미네이트' },
    {path:'2',name:'나이키' },
    {path:'3',name:'브라운 브레스' },
    {path:'4',name:'반스' },
    {path:'5',name:'폴로' },

    ];
  brands2=[
    {path:'6',name:'커버낫' },
    {path:'7',name:'더블유브이' },
    {path:'8',name:'Lee' },
    {path:'9',name:'아커버' },
    {path:'10',name:'어반드래스' },
  ];


  imageLength: number = this.imageList.length;
  currentImage: String;

  private slideInterval: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void{
    this.getImage(this.currentImageId);
    this.autoSlide();

    /*
    this.http.get(`https://tryon-399311.du.r.appspot.com/posts/all`)
    .subscribe((data: any[]) => {

      console.log(data);
      this.posts = data;
      for (let i = 0; i < data.length; i++) {
        this.currentIndices[i] = 0;
      }
    });

    */
  }

  ngOnDestroy(): void{
    clearInterval(this.slideInterval);
  }

  autoSlide(){
    this.slideInterval = setInterval(()=>{
      this.imageSlideRight();
    }, 1500);
  }

  imageSlideRight() {
    this.currentImageId = (this.currentImageId + 1) % this.imageList.length;
    this.getImage(this.currentImageId);
  }
  imageSlideLeft(){
    if(this.currentImageId > 0){
      this.currentImageId -= 1
      this.getImage(this.currentImageId)
    } else { }
  }
  getImageList():Observable<number>{
    return of(this.currentImageId);
  }
  getImage(id: number): void{
    this.currentImage = this.imageList[id]
  }
  goBack(): void{
    this.router.navigate(["../"])
  }

  onMouseEnter(){
    this.overlayComponent.showOverlay();
  }

  onMouseLeave(){
    this.overlayComponent.hideOverlay();
  }
}
