import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/authentication.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confpassword: new FormControl('', Validators.required)
  }, this.pwdMatchValidator);

  constructor(
    private authService: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }
   
  get f(){
    return this.form.controls;
  }
   
  submit(){
    let name = this.form.value.name;
    let email = this.form.value.email;
    let password = this.form.value.password;

    this.authService.register(name, email, password).subscribe(
      data => {
        alert('Account successfully registered!');
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
      }
    )
  }

  pwdMatchValidator(frm: FormGroup) {
    return frm.value.password === frm.value.confpassword
       ? null : {'mismatch': true};
  }
}
