import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IStory } from 'src/app/model/story';
import { StoryService } from 'src/app/service/story.service';
import { CreateStoryComponent } from '../create-story/create-story.component';
import { StoryPopupComponent } from '../story-popup/story-popup.component';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
stories:IStory[]=[]
  constructor(private dialog: MatDialog,
    private storyService:StoryService) { 
    this.imageToShow="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
  }

  imageToShow: any = null;
  ngOnInit(): void {
    this.storyService.getFollowingStories(0)
    .then(data=>{
      this.stories=data
      console.log(data)
    }).catch()
  }
  private createImage(image: Blob) {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
      }, false);

      reader.readAsDataURL(image);
  }
  createStory() {
    this.dialog.open(CreateStoryComponent, {
      width: '600px',
      height: '700px'
    })
  }
  onClick(story:IStory){
    this.dialog.open(StoryPopupComponent, {
      width: '600px',
      height: '700px',
      data: {
        dataKey: {currentStory:story,stories:this.stories}
      }
    })
  }
  cards = [
    {
      title: 'Card Title 1',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 2',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 3',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 4',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },

  ];
}
