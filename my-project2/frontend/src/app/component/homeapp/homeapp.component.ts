import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {OverlayComponent} from "./overlay/overlay.component";

@Component({
  selector: 'app-home',
  templateUrl: './homeapp.component.html',
  styleUrls: ['./homeapp.component.css'],
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

export class HomeappComponent implements OnInit, OnDestroy{

  @ViewChild('overlayComponent') overlayComponent: OverlayComponent;
  currentImageId: number = 0;
  imageRoot: String = "assets/sliderImage/"
  imageList: Array<String> = [
    this.imageRoot + "IMG_4124.PNG",
    this.imageRoot + "IMG_4125.PNG",
    this.imageRoot + "IMG_4126.PNG",
    this.imageRoot + "제목 7.png"
  ]
  imageLength: number = this.imageList.length;
  currentImage: String;

  private slideInterval: any;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void{
    this.getImage(this.currentImageId);
    this.autoSlide();
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
