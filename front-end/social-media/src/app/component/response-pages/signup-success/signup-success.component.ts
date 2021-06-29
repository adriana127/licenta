import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup-success',
  templateUrl: './signup-success.component.html',
  styleUrls: ['./signup-success.component.css']
})
export class SignupSuccessComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SignupSuccessComponent>) { }

  ngOnInit(): void {
  }
  
  closeDialog(){
    this.dialogRef.close();
  }

}
