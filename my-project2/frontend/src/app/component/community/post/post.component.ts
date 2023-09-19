import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  post = {
    username: '',
    title: '',
    gender: '',
    style: '',
    body: '',
    imageFiles: [],
    //postIds: []
  };

  constructor(private http: HttpClient,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.post.username = localStorage.getItem('username');
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('title', this.post.title);
    formData.append('gender', this.post.gender);
    formData.append('style', this.post.style);
    formData.append('username', this.post.username);
    formData.append('body', this.post.body);
    /*for(let postId of this.post.postIds){
      formData.append('postIds', postId);
    }*/
    for(let imageFile of this.post.imageFiles){
      formData.append('imageFiles', imageFile.file);
    }


    this.http.post('https://tryon-399311.du.r.appspot.com/posts', formData, { observe: 'response', responseType: 'text' })
      .subscribe(
        response => {
          if (response.status === 201) {
            console.log('게시물이 등록되었습니다.');
            this.router.navigate(['/community']);
            this.snackBar.open('게시물 등록에 성공했습니다!', '',
              { duration: 2000, horizontalPosition: 'center', verticalPosition: 'top'});
          } else {
            console.error('Unexpected status code', response.status);
          }
        },
        error => {
          console.error('An error occurred:', error);
        }
      );

  }

  onImageChange(event){
    if(event.target.files && event.target.files.length>0){
      for(let file of event.target.files){
        let reader = new FileReader();
        reader.onload = (e:any) => {
          this.post.imageFiles.push({file, url:e.target.result});
        }
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index:number){
    this.post.imageFiles.splice(index, 1);
  }

}
