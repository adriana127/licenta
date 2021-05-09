import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig ,MatDialog} from '@angular/material/dialog';

import { CreatePostComponent } from '../create-post/create-post.component'
@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
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
  constructor(private httpClient: HttpClient,private dialog:MatDialog) { 
    this.httpClient.get('http://localhost:8080/post/3/', { responseType: 'blob' })
    .subscribe(
      res => {
        this.createImage(res)
      }
    );
  }

  imageToShow: any = null;
  ngOnInit(): void {
  }
  private createImage(image: Blob) {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
      }, false);

      reader.readAsDataURL(image);
  }
  onCreate(){
    this.dialog.open(CreatePostComponent, {
      width: '600px',
      height:'700px'
    })
      }
}

