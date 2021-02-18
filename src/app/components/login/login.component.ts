import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
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
    let password = this.form.value.password;

    this.authService.login(email, password).subscribe(
      data => {
        // console.log(data.data.token);
        localStorage.setItem('login_token', data.data.token);
        localStorage.setItem('username', data.data.user.name);
        this.router.navigate(['/profile']);
      },
      err => {
        console.log(err);
      }
    )
  }
}
