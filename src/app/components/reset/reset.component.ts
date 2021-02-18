import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent {
  token: string;
  form: any = {
    email: null
  };

  constructor(
    private authService: AuthService, 
    private route: ActivatedRoute,
    private router: Router
    ) 
   {
    this.token = "";
   }

  onSubmit(): void {
    const { password } = this.form;
    let email = localStorage.getItem('forgot_email') || "";
    this.token = this.route.snapshot.queryParams['token'];

    this.authService.reset(email, this.token, password).subscribe(
      data => {
        alert('Password has been reset!');
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
      }
    )
  }

}
