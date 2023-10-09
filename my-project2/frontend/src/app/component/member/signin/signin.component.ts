import {Component} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import { SignService } from "../../../service/rest-api/sign.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location} from "@angular/common";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})


export class SigninComponent{
  signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signService: SignService,
    private snackBar: MatSnackBar,
    private location: Location) {
    this.signInForm = this.formBuilder.group({
      uid: ["", Validators.required],
      password: ["", Validators.required]
    });
  }


  submit() {
    const signInData = this.signInForm.value;

    if (this.signInForm.valid) {
      this.signService.login(signInData).subscribe(
        (response) => {
          console.log(response);
          this.location.back();
          this.snackBar.open('로그인에 성공했습니다!', '', {
            duration: 2000, // Duration of the message in milliseconds
            horizontalPosition: 'center', // Horizontal position of the message on the screen
            verticalPosition: 'top' // Vertical position of the message on the screen
          });
        },
        (error) => {
          console.error(error);
          this.snackBar.open('올바르지 않은 입력값입니다(로그인 실패)','',{
            duration: 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      );
    }
  }
}
