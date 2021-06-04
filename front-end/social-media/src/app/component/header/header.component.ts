import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { INotification } from 'src/app/model/notification';
import { Profile } from 'src/app/model/profile';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { ProfileService } from 'src/app/service/profile.service';
import { PostPopupComponent } from '../post-page/post-popup/post-popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loaded: boolean = false;
  user: User
  profile!: Profile
  profilePhoto!: String
  notifications: INotification[] = []
  newNotifications:INotification[]=[]
  numberOfNotifications: number = 3;
  hidden: boolean = true;
  constructor(private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private profileService: ProfileService,
    private notificationService: NotificationService,
    private postService:PostService,
    private router:Router
  ) {
    this.notificationService.findAll().pipe(map(comments => comments.sort(HeaderComponent.descendingByPostedAt)))
      .subscribe(posts => {
        posts.forEach(async notification => {

          this.notifications.push(notification)
        })
      });
      this.notificationService.findNew().pipe(map(comments => comments.sort(HeaderComponent.descendingByPostedAt)))
      .subscribe(posts => {
        posts.forEach(async notification => {

          this.newNotifications.push(notification)
        })
        this.numberOfNotifications = this.newNotifications.length
        this.hidden = this.numberOfNotifications == 0
      });
      this.notificationService
    .onNotification()
    .subscribe(async (notification: INotification) => {
      this.notifications.push(notification)
      this.newNotifications.push(notification)
      this.numberOfNotifications = this.newNotifications.length
      this.hidden = this.numberOfNotifications == 0
    });
    this.user = authenticationService.getCurrentUser()

  }
  static descendingByPostedAt(post1: INotification, post2: INotification): number {
    return new Date(post2.createdOn).getTime() - new Date(post1.createdOn).getTime();
  }
  async ngOnInit() {
    await this.profileService.loadData()
    await this.profileService.getProfile(this.authenticationService.getCurrentUser()).then(data => {
      this.profile = data;
    }).catch(err => { console.log(err) })
    if (this.profile.photo != null)
      this.profilePhoto = "data:image/jpeg;base64," + this.profile.photo;
    else
      this.profilePhoto = "assets/resources/user.png";
    this.loaded = true;
  }
  onClick(notification:INotification){
    if(notification.post)
    this.dialog.open(PostPopupComponent, {
      width: '900px',
      height: '780px',
      data: {
        dataKey: this.postService.convertPostToNewsFeedPost(notification.post)
      }
    })
    else
    this.router.navigate(['/profile'], { queryParams: { username: notification.sender.username } });
  }
  onNotificationOpen(){
    this.notificationService.openNotifications(this.newNotifications).subscribe(val=>{})
    this.hidden=true
    this.newNotifications=[]
  }
  logout() {
    this.authenticationService.logout()
  }

}
