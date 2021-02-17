import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loginName = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('login_token') === null) {
      this.router.navigate(['/login']);
    } else {
      this.loginName = localStorage.getItem('username') || "";
    }
  }

  onLogout() {
    this.authService.logout(localStorage.getItem('login_token') || "").subscribe(
      data => {
        localStorage.removeItem('login_token');
        localStorage.removeItem('username');
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
      }
    );
  }

}
