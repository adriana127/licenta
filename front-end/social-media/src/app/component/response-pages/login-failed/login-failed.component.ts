import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-failed',
  templateUrl: './login-failed.component.html',
  styleUrls: ['./login-failed.component.css']
})
export class LoginFailedComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<LoginFailedComponent>) { }

  ngOnInit(): void {
  }
  
  closeDialog(){
    this.dialogRef.close();
  }
}
