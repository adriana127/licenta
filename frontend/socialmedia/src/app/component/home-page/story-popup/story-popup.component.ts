import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profile } from 'src/app/model/profile';
import { IStory } from 'src/app/model/story';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-story-popup',
  templateUrl: './story-popup.component.html',
  styleUrls: ['./story-popup.component.css']
})
export class StoryPopupComponent implements OnInit {
  stories:IStory[]
  story:IStory
  indexOfStory:number
  creatorProfile!: Profile
  loaded:boolean=false
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private profileService: ProfileService,
  private dialogRef: MatDialogRef<StoryPopupComponent>,
  ) {
    this.story=data.dataKey.currentStory
    this.stories=data.dataKey.stories
    this.indexOfStory=this.stories.indexOf(this.story)
    console.log(this.indexOfStory)
   }

  async ngOnInit() {
    await this.profileService.getProfile(this.story.user)
        .then(data => {
          this.creatorProfile = data;
          this.loaded=true
        }).catch(err => { 
          console.log(err) })
  }

  async onClick(){
    this.indexOfStory+=1
    if(this.indexOfStory===this.stories.length){
      this.closeDialog();
      return
    }
    this.story=this.stories[this.indexOfStory]
    await this.ngOnInit()
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
