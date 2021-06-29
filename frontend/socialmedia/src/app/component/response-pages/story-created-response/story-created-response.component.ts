import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-story-created-response',
  templateUrl: './story-created-response.component.html',
  styleUrls: ['./story-created-response.component.css']
})
export class StoryCreatedResponseComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<StoryCreatedResponseComponent>) { }

  ngOnInit(): void {
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
