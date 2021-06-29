import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup-failed',
  templateUrl: './signup-failed.component.html',
  styleUrls: ['./signup-failed.component.css']
})
export class SignupFailedComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SignupFailedComponent>) { }

  ngOnInit(): void {
  }
  
  closeDialog(){
    this.dialogRef.close();
  }

}
