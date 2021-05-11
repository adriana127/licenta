import { Component, OnInit } from '@angular/core';
import { NewsFeedPost } from 'src/app/model/newsfeedpost';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent implements OnInit {

  constructor(private postService: PostService) {
  }

  imageToShow: any = null;
  posts!: NewsFeedPost[]
  async ngOnInit(): Promise<void> {
    await this.reloadData()
  }
  async reloadData() {
    await this.postService.loadData()
    this.posts = this.postService.getNewsFeedPosts(10)
  }

}
