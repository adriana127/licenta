import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // since RxJs 6
import { first, map } from 'rxjs/operators';
import { Post } from '../model/post';
import { RestService } from './utils/rest.service';
import { Like } from '../model/like';
import { NewsFeedPost } from '../model/newsfeedpost';
import { AuthenticationService } from './authentication/authentication.service';
import { User } from '../model/user';
import { WebSocketService } from './utils/websocket.service';
import { PostComment } from '../model/comment';
import { ChatMessage } from '../model/message';
import { IStory } from '../model/story';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private restService: RestService,
    private authenticationService: AuthenticationService,
    private socketClient: WebSocketService) {
 }

  public createStory(story: IStory, image: File) {
    const formData: FormData = new FormData();
    formData.append('photo', image);
    formData.append('story', JSON.stringify(story));
    return this.restService.post("story/create", formData);
  }
  async getFollowingStories(requestNumber:number){
    let stories:IStory[]
    await this.restService.get("http://localhost:8080/story/getAll/"+this.authenticationService.getCurrentUser().id+"/"+requestNumber)
    .then(res => {
      stories = res as IStory[]
    })
    return stories!
  }

}
