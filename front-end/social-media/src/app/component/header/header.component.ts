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
  user: User
  profile!: Profile
  profilePhoto!: String
  notifications: INotification[] = []
  newNotifications: INotification[] = []
  numberOfNotifications: number = 0;
  hidden: boolean = true;

  searchControl = new FormControl();
  filteredOptions!: Observable<Profile[]>;
  allProfiles:Profile[]=[]
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

    this.user = authenticationService.getCurrentUser()
  }

  async ngOnInit() {
    await this.profileService.loadData()
    this.profilePhoto = this.profileService.fixPhoto(this.profileService.getPersonalProfile())
    this.loaded = true;
  }
  onClick(notification: INotification) {
    if (notification.post)
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
  onNotificationOpen() {
    this.notificationService.openNotifications(this.newNotifications).subscribe(val => { })
    this.hidden = true
    this.newNotifications = []
  }
  async onFocus(){
    this.options=[]
    await this.profileService.getProfiles().then(data=>{this.allProfiles=data as Profile[]
      this.allProfiles.forEach(profile=>{
        profile.photo=this.profileService.fixPhoto(profile)
      })
      this.filteredOptions = this.searchControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );})
  }
  onSearchChange(){
    if(this.searchControl.value.length>0)
      this.options=this.allProfiles;
    else
      this.options=[]
  }
  private _filter(value: string): Profile[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.user.nickname.toLowerCase().includes(filterValue));
  }
  logout() {
    this.authenticationService.logout()
  }

}
