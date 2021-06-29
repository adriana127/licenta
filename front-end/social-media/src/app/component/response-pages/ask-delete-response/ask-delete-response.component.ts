import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-ask-delete-response',
  templateUrl: './ask-delete-response.component.html',
  styleUrls: ['./ask-delete-response.component.css']
})
export class AskDeleteResponseComponent implements OnInit {
post:Post
  constructor(private dialogRef: MatDialogRef<AskDeleteResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postService:PostService) {
      this.post = data.dataKey.post
     }

  ngOnInit(): void {
  }
  onDelete(){
    this.postService.deletePost(this.post)
    .subscribe(() => {
      window.location.reload();
      this.closeDialog()
    }
    );
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
