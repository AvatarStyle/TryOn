import {Component, Inject, NgZone} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { ResultService } from './result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  data;
  generatedIMG;
  public imageExists = false;
  checkingImage;
  loadingImage;

  constructor(
    public dialogRef: MatDialogRef<ResultComponent>,
    @Inject(MAT_DIALOG_DATA) public abc:any,
    private ngZone: NgZone,
    private http: HttpClient,
    private resultService :ResultService
  )
  {
    //위치 설정
    this.checkImage();
  }



  checkImage() {
    this.checkingImage = true;

    const img = new Image();

    const checkInterval = setInterval(() => {

      try {
        this.data = this.resultService.getData();

        if (this.data) {
        this.generatedIMG = this.data.generatedIMG;
        img.src = this.generatedIMG;

        img.onload = () => {
          this.imageExists = true;
          clearInterval(checkInterval); // 파일이 존재하는 경우 setInterval 종료
        };
      }

      } catch (error) {
        // 예외가 발생했을 때 실행되는 코드
        console.error('An error occurred:', error);
      }

      console.log(this.data)
      img.onerror = () => {
        this.imageExists = false; // 이미지가 없을 경우 false로 설정
      };
    }, 500); // 0.5초마다 파일 존재 여부 확인

    setTimeout(() => {
      clearInterval(checkInterval);
    }, 60000); // 30초 후에 setInterval 종료

  }

  async downloadImage() {
    this.http.get(this.generatedIMG, { responseType: 'blob' }).subscribe((response) => {
      this.saveImageLocally(response);
    });
  }

  saveImageLocally(imageBlob: Blob) {
    const file = new File([imageBlob], 'imageFileName.jpg', {
      type: 'image/jpeg', // 이미지 타입에 맞게 설정
    });

    // 파일 저장 로직
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  private getTimeStampText(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}_${hour}${minute}${second}`;
  }

  private async imageToBlob(imageUrl: string): Promise<Blob> {
    const response = await this.http.get(imageUrl, { responseType: 'blob' }).toPromise();

    return new Blob([response], { type: response.type });
  }
}
