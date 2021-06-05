import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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
  profile!: Profile
  notifications: INotification[] = []
  newNotifications: INotification[] = []
  numberOfNotifications: number = 0;
  hidden: boolean = true;

  searchControl = new FormControl();
  options:Profile[]=[]

  constructor(private authenticationService: AuthenticationService,
              private dialog: MatDialog,
              private profileService: ProfileService,
              private notificationService: NotificationService,
              private postService: PostService,
              private router: Router) {
    this.notificationService.findAll()
      .pipe()
      .subscribe(posts => {
                  posts.forEach(async notification => {
                  this.notifications.push(notification)})
    });

    this.notificationService.findNew()
      .pipe()
      .subscribe(posts => {
                  posts.forEach(async notification => {
                  this.newNotifications.push(notification)})
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
  }

  async ngOnInit() {
    this.profile=this.profileService.getPersonalProfile()
    this.loaded = true;
  }

  onClick(notification: INotification) {
    if (notification.post)
      this.dialog.open(PostPopupComponent, {
        width: '900px',
        height: '780px',
        data: {dataKey: this.postService.convertPostToNewsFeedPost(notification.post)}
      })
    else
      this.router.navigate(['/profile'], { queryParams: { username: notification.sender.username } });
  }
  
  onNotificationOpen() {
    this.notificationService.openNotifications(this.newNotifications)
        .subscribe( () => {
           this.hidden = true
           this.newNotifications = []
        })
  }

  async onSearchChange(){
    if(this.searchControl.value.length>0)
      await this.profileService.search(this.searchControl.value)
      .then(results=>{
        this.options=results as unknown as Profile[]
        this.options.forEach(profile=>{
          profile.photo=this.profileService.fixPhoto(profile)
        })
      })
    else this.options=[]
  }

  logout() {
    localStorage.removeItem('currentProfile');
    this.authenticationService.logout()
  }

}
