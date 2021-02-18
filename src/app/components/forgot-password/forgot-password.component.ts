import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    private authService: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    if(localStorage.getItem('login_token') !== null) {
      //this.isLoggedIn = true;
      this.router.navigate(['/profile']);
    }
  }
   
  get f(){
    return this.form.controls;
  }
   
  submit(){
    let email = this.form.value.email;

    this.authService.forgot(email).subscribe(
      data => {
        localStorage.setItem('forgot_email', email);
        alert('An email has been sent to reset your password.');
      },
      err => {
        console.log(err);
      }
    )
  }
}
