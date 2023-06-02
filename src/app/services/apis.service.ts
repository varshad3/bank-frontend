import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http:HttpClient) { }

  // register
  register(acno:any,password:any,username:any){

    // req body
    const body={
      acno,
      password,
      username
    }
    return this.http.post('http://localhost:3000/register',body)
  }
  // login
  login(acno:any,password:any){
    // req body
    const body={
      acno,
      password
    }
    return this.http.post('http://localhost:3000/login',body)
  }

  // append token to the request header
  
  appendToken(){
    // get token from localstorage
    let token=localStorage.getItem('token')
    // create http header
    let headers=new HttpHeaders()
    if(token){

     headers= headers.append('verify-token',token)
     options.headers=headers
    }
    return options
  }


  // get balance
  getBalance(acno:any){
    return this.http.get('http://localhost:3000/get-balance/'+acno,this.appendToken())
  }


  //fund transfer
  fundTransfer(toAcno:any,pswd:any,amount:any){

    const body={
      toAcno,
      pswd,
      amount
    }
    return this.http.post('http://localhost:3000/fund-transfer',body,this.appendToken())
  }

  // all-transaction

  allTransaction(){
    return this.http.get('http://localhost:3000/all-transaction',this.appendToken())

  }

  // delete My Account

  deleteAcno(){
    return this.http.delete('http://localhost:3000/delete-my-account',this.appendToken())
  }


}
