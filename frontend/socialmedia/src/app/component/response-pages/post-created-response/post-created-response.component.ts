import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-post-created-response',
  templateUrl: './post-created-response.component.html',
  styleUrls: ['./post-created-response.component.css']
})
export class PostCreatedResponseComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PostCreatedResponseComponent>) { }

  ngOnInit(): void {
  }
  
  closeDialog(){
    this.dialogRef.close();
  }

}
