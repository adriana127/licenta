import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IStory } from 'src/app/model/story';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { StoryService } from 'src/app/service/story.service';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.css']
})
export class CreateStoryComponent implements OnInit {

  constructor(
    private storyService:StoryService,
    private dialogRef: MatDialogRef<CreateStoryComponent>,
    private authenticationService:AuthenticationService
    ) {
    this.story = { id: 0, user: this.authenticationService.getCurrentUser(), createdOn: new Date(),followers: [], photo: "" };
    this.imgURL = "https://i.stack.imgur.com/y9DpT.jpg";

     }

  ngOnInit(): void {
  }
  selectedFile!: File;
  imgURL: any;
  story:IStory
  preview(files: any) {
    if (files.length === 0)
      return;
    this.selectedFile = files[0];
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }


  onUpload() {
    this.storyService.createStory(this.story, this.selectedFile)
      .subscribe((response) => {
        alert(response)
        this.closeDialog()
      }
      );
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
