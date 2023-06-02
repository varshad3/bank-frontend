import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent {

@Input() deleteAcno:any
@Output() onCancel=new EventEmitter()
@Output() onDelete=new EventEmitter()

cancel(){
  this.onCancel.emit()
}

deleteFromChild(){
this.onDelete.emit()
}
}
