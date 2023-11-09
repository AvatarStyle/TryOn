import {Component, OnInit} from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { ResultComponent } from "../../result/result.component";
import {MatDialog} from "@angular/material/dialog";
import {ClosetService} from "../../../service/closet.service";
import {ProductService} from "../../../service/product.service";
import {forkJoin} from "rxjs";
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-fitting',
  templateUrl: './fitting.component.html',
  styleUrls: ['./fitting.component.css']
})
export class FittingComponent implements OnInit{

  localserver: string = '';
  imagePath: string = '/assets/avatar_woman.png';
  modelInput;
  clothesInput = true;
  modelImg;
  clothesImg;
  modelPreview;
  clothesPreview;
  responseImage;

  clothesSrc: string = "";

  closetItems = [];

  username = localStorage.getItem('username');
  constructor(private http: HttpClient,
              private dialog: MatDialog,
              private closetService: ClosetService,
              private productService: ProductService) { }

  ngOnInit() {
    const username = localStorage.getItem('username');

    if (username) {
      this.closetService.getCloset(username).subscribe(closet => {
        const requests = closet.productIds.map(productId =>
          this.productService.getProduct(productId)
        );

        forkJoin(requests).subscribe(
          products => this.closetItems = products,
          error => console.error(error)
        );
      });
    }
  }

  //this[imageId]  저건 this의 imageId 외부에서 임력한것과 동일한 변수명에다가 저장하라는뜻
  imageInput(imageId:string) {
    this[imageId] = document.getElementById(imageId) as HTMLInputElement;
    this[imageId].click();
  }

  handleImageChange(event: Event, previewId: string, imgId:string, imageInput:string) {
    const fileInput = (event.target as HTMLInputElement);
    if (fileInput.files && fileInput.files.length > 0) {
      this[imgId] = fileInput.files[0];
      var file = fileInput.files[0];
    }
    this[previewId] = document.getElementById(previewId) as HTMLImageElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this[previewId].src = e.target.result as string;
        this[imageInput]=true;
      }
      reader.readAsDataURL(file);
    } else {
      this[previewId].src = '';
      this[imageInput]=false;
    }
  }

  sendImageInput(){
    if(this.modelImg&&this.clothesImg){
      const formData: FormData = new FormData();
      formData.append('modelImage', this.modelImg);
      formData.append('clothesImage', this.clothesImg);

      this.responseImage = null;

      this.openImageDialog();

      this.http.post('/fitting/upload/', formData,{responseType: 'blob'}).subscribe((response: Blob) => {
        // Blob 데이터를 파일로 다운로드
        const blobUrl = window.URL.createObjectURL(response);
        this.responseImage = blobUrl;
        // Blob 데이터를 "image/png" MIME 타입으로 처리
        this.openImageDialog();
      });
    }
  }

  openImageDialog(): void{
    if(this.responseImage !== null){
      const dialogRef = this.dialog.open(ResultComponent,{
        width: '80%',
        data: { generatedIMG : this.responseImage }
      });
    }
  }

  /*openImageDialog(): void{
    let imagePath = this.modelImg.name +"_"+ this.clothesImg.name
    const dialogRef = this.dialog.open(ResultComponent,{
      width: '80%',
      data: { generatedIMG : this.responseImage }
    });
  }*/

  applyCloth(imageSrc: string): void {
    const clothesPreview = document.getElementById('clothesPreview') as HTMLImageElement;
    clothesPreview.src = imageSrc;
  }
}
