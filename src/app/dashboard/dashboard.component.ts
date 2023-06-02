import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApisService } from '../services/apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isCollapse:boolean=true
  user:string=''
  currentAcno:any
  balance:number=0
  transferErrorMsg:string=''
  transferSuccessMsg:string=''
  logoutStatus:boolean=false
  acno:any
  deleteConfirmStatus:boolean=false
  deleteSuccessMessage:string=''


  // form group

  fundtransferForm=this.fb.group({
    creditAcno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    Password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
  })


  constructor(private fb:FormBuilder,private api:ApisService,private dashboardRouter:Router){


  }

  ngOnInit(): void {
    
    if(!localStorage.getItem('token')){
      alert('please login...')
      this.dashboardRouter.navigateByUrl('')

    }
 if(localStorage.getItem('currentUser')){
 this.user=localStorage.getItem('currentUser') || ''
 }
 if(localStorage.getItem('currentAcno')){
  this.currentAcno=localStorage.getItem('currentAcno')
 }

  }

  collapse(){
    this.isCollapse=!this.isCollapse
  }

  // call getba;ance
  getBalance(){
// api call

this.api.getBalance(this.currentAcno)
.subscribe((result:any)=>{
  this.balance=result.balance
},

(result:any)=>{
  alert(result.error.message)
})
  }

  // fund transfer
  transfer(){

    if(this.fundtransferForm.valid){
      // get details from fund transfer 
      
      let creditAcno=this.fundtransferForm.value.creditAcno
      let pswd=this.fundtransferForm.value.Password
      let amount=this.fundtransferForm.value.amount

      // call api
      this.api.fundTransfer(creditAcno,pswd,amount)
      .subscribe(
        
        (result:any)=>{
          console.log(result);
          this.transferSuccessMsg=result.message
          setTimeout(() => {
            this.transferSuccessMsg=""
          }, 5000);
          
      },
      (result:any)=>{
        console.log(result.error);

        this.transferErrorMsg=result.error.message
        setTimeout(() => {
          this.closeFundtransferform()
         }, 3000);
      }
      )
    }

    else{
      alert('invalid form ')
    }
  }

  // to reset form
  closeFundtransferform(){
    this.fundtransferForm.reset()
    this.transferErrorMsg=""
    this.transferSuccessMsg=""
  }

  //for logout
logout(){

// remove all data stored in local storage for particular user
localStorage.removeItem('currentUser')
localStorage.removeItem('token')
localStorage.removeItem('currentAcno')

// update ougout status
this.logoutStatus=true
// wait 2 sec to redirect
setTimeout(() => {
   // navigate to login
   this.dashboardRouter.navigateByUrl('')
}, 3000);

 
}

// delete the account
deleteAccount(){
  // data to be shared with child
  this.acno = localStorage.getItem('currentAcno')
  this.deleteConfirmStatus = true
}

// cancel delete conformation
cancelDeleteConfirm(){
  this.acno=""
  this.deleteConfirmStatus= false
}

deleteFromParent(){
this.api.deleteAcno().subscribe((result:any)=>{

// remove all data stored in local storage for this particular user
localStorage.removeItem('currentUser')
localStorage.removeItem('token')
localStorage.removeItem('currentAcno')
this.deleteSuccessMessage = result.message
this.deleteConfirmStatus=true
setTimeout(() => {
  // navigate to login
  this.dashboardRouter.navigateByUrl('')
}, 3000);

})
}

}
