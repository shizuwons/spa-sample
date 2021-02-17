import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  form: any = {
    email: null
  };

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    const { email } = this.form;

    this.authService.forgot(email).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    )
  }

}
