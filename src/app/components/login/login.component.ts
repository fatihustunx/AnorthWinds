import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService){}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(res => {
        localStorage.setItem("token",res.data.token);
        this.toastrService.success(res.message,"Success");
      },errorRes => {
        if(errorRes.error.Errors){
          for (let index = 0; index < errorRes.error.Errors.length; index++) {
            const element = errorRes.error.Errors[index];
            this.toastrService.error(element.ErrorMessage,"Val1 Error");
          }
        }else{
          this.toastrService.error(errorRes.error.message,"Error");
        }
      })
    }else{
      this.toastrService.error("Form is not valid!","Forms");
    }
  }
}