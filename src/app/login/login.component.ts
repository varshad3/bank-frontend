import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApisService } from '../services/apis.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginErrorMsg:string=''
  loginSuccessStatus:boolean=false

 loginForm = this.loginFb.group({
    // form array
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
  })

  constructor(private loginFb:FormBuilder,private api:ApisService,private loginRouter:Router){

  }
  login(){
    if(this.loginForm.valid)
    {
      // get acno and pwd

      let acno=this.loginForm.value.acno
      let pswd=this.loginForm.value.password

      // api call for login
      this.api.login(acno,pswd)
      .subscribe(
        // response 200
        (result:any)=>{
          // login success status set as true
          this.loginSuccessStatus=true
          // store current user in local storage 
          localStorage.setItem("currentUser",result.currentUser)
          // store token in localstorage
          localStorage.setItem("token",result.token)
          // store currentacno in localstorage
          localStorage.setItem("currentAcno",result.currentAcno)
          setTimeout(() => {
            // redirect to dashboard page
            this.loginRouter.navigateByUrl('dashboard')
            
          }, 3000);
          
        },
        // response 400
        (result:any)=>{
          this.loginErrorMsg=result.error.message
          setTimeout(() => {
            this.loginForm.reset()
            this.loginErrorMsg=""
          }, 3000);

        }
      )


    }
    else{
      alert('invalid form')
    }
  }
}
