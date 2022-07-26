import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;

  loginForm : FormGroup  = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  onSubmit() : void {
    console.log("form values : ", {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
    this.isLoading = true;
    // let formData = new FormData();
    // formData.append('email', this.loginForm.value.email);
    // formData.append('password', this.loginForm.value.password);
    this.dataService.logIn(
      new URLSearchParams({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })).subscribe((res) => {
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res));
      this.isLoading = false;
      window.location.href = "/";
    });
  }

}
