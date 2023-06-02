import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{

  transactions:any=[]
  searchTerm:string=""
constructor(private api:ApisService,private transactionRouter:Router){

}

ngOnInit(): void {
  if(!localStorage.getItem('token')){
    alert('please login...')
    this.transactionRouter.navigateByUrl('')

  }
  this.api.allTransaction()
  .subscribe(
    // response 200
    (result:any)=>{
      console.log(result);
      this.transactions=result.transaction
      
    },
    // response 400
   (result:any)=>{
    console.log(result.error);
    
   }
    )
}

// generate pdf
generatePDF(){

  // 1.create a obect for jspdf
  var pdf = new jspdf()
// 2.set up title row for the table
let tHead = ['type','from Account','to Account','Amount']
let tBody = []
//3. set up the pdf properties
pdf.setFontSize(16)
pdf.setTextColor('blue')
pdf.text('Mini statements',15,10)
pdf.setFontSize(12)


// 4.to display as table need to convert array of object to nested array
for(let item of this.transactions){
  let temp=[item.type,item.fromAcno,item.toAcno,item.amount]
  tBody.push(temp)
}
// 5.convert nested array to table using autotable
(pdf as any).autoTable(tHead,tBody,{startY:15})

// 6.to open pdf in another tab
pdf.output('dataurlnewwindow')
// 7.to download /save pdf
pdf.save('Ministatement.pdf')

}

}
