import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  // isLoggedIn = false;
  // isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('login_token') !== null) {
      //this.isLoggedIn = true;
      this.router.navigate(['/profile']);
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe(
      data => {
        // this.isLoginFailed = false;
        // this.isLoggedIn = true;
        console.log(data.data.token);
        localStorage.setItem('login_token', data.data.token);
        localStorage.setItem('username', data.data.user.name);
        this.router.navigate(['/profile']);
      },
      err => {
        console.log(err);
      }
    )
  }

  reloadPage(): void {
    window.location.reload();
  }

}
