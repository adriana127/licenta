import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenu } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DisplayChat } from 'src/app/model/displaychat';
import { ChatMessage } from 'src/app/model/message';
import { INotification } from 'src/app/model/notification';
import { Profile } from 'src/app/model/profile';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { ChatService } from 'src/app/service/chat.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { ProfileService } from 'src/app/service/profile.service';
import { ActiveChatsComponent } from '../chat-page/active-chats/active-chats.component';
import { PostPopupComponent } from '../post-page/post-popup/post-popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild(MatMenu, { static: false }) matMenu!: MatMenu;
  @ViewChild(MatMenu, { static: false }) matMenu2!: MatMenu;

  loaded: boolean = false;
  profile!: Profile
  notifications: INotification[] = []
  newNotifications: INotification[] = []
  numberOfNotifications: number = 0;
  hidden: boolean = true;
  messagesBadge: boolean = true;
  searchControl = new FormControl();
  options: Profile[] = []
  loadMoreNotificationsRequestNumber: number = 0
  numberOfMessages: number = 0
  chats: DisplayChat[] = []

  constructor(private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private profileService: ProfileService,
    private notificationService: NotificationService,
    private postService: PostService,
    private router: Router,
    private chatService: ChatService,) {
    this.notificationService.findAll(this.loadMoreNotificationsRequestNumber)
      .pipe()
      .subscribe(posts => {
        posts.forEach(async notification => {
          this.notifications.push(notification)
        })
      });

    this.notificationService.findNew()
      .pipe()
      .subscribe(notifications => {
        notifications.forEach(async notification => {
          this.newNotifications.push(notification)
        })
        this.notifications = this.notifications.sort((notification1, notification2) => (notification2.createdOn < notification1.createdOn) ? 1 : ((notification1.createdOn < notification2.createdOn) ? -1 : 0))
        this.numberOfNotifications = this.newNotifications.length
        this.hidden = this.numberOfNotifications == 0
      });

    this.notificationService
      .onNotification()
      .subscribe(async (notification: INotification) => {
        this.notifications.push(notification)
        this.notifications = this.notifications.sort((notification1, notification2) => (notification2.createdOn > notification1.createdOn) ? 1 : ((notification1.createdOn > notification2.createdOn) ? -1 : 0))
        this.newNotifications.push(notification)
        this.numberOfNotifications = this.newNotifications.length
        this.hidden = this.numberOfNotifications == 0
      });

    this.chatService.getChats(0, this.profileService.getPersonalProfile().id)
      .subscribe(chats => {
        chats.forEach(async value => {
          let message: ChatMessage
          await this.chatService.getLastMessage(value).then(data => {
            message = data as ChatMessage
            this.chatService.convertChat(value)
            this.updateNewMessage(message)
            this.chats.push({ chat: value, message: message! })
            this.messagesBadge = this.numberOfMessages == 0
          })
        })
      });

    this.chatService
      .onMessageCreated()
      .subscribe((message: ChatMessage) => {
        this.updateNewMessage(message)
        this.chats.find(chat => chat.chat.id === message.chat.id)!.message = message
        this.chats = this.chats.sort(ActiveChatsComponent.ascendingByLastMessage)
      });
    this.profile = this.profileService.getPersonalProfile()
    this.loaded = true;
  }

  ngAfterViewInit(): void {
    this.matMenu.closed.subscribe(() => {
      this.onMenuClose()
    })
    this.matMenu2.closed.subscribe(() => {
      this.onMenuClose()
    })
  }

  updateNewMessage(message: ChatMessage) {
    if (message.sender.user.id == this.authenticationService.getCurrentUser().id)
      message!.state = true
    else if (!message!.state&&this.chats.filter(chat=>chat.message.state===false).length==0)
      this.numberOfMessages += 1
    this.messagesBadge = this.numberOfMessages == 0
  }

  onClick(notification: INotification) {
    if (notification.post)
      this.dialog.open(PostPopupComponent, {
        width: '900px',
        height: '780px',
        data: { dataKey: this.postService.convertPostToNewsFeedPost(notification.post) }
      })
    else
      this.router.navigate(['/profile'], { queryParams: { username: notification.sender.username } });
  }

  onNotificationOpen() {
    this.notificationService.openNotifications(this.newNotifications)
      .subscribe(() => {
        this.hidden = true
        this.newNotifications = []
      })
  }

  onMenuClose() {
    this.onNotificationOpen()
  }

  loadMoreNotifications() {
    this.loadMoreNotificationsRequestNumber += 1
    this.notificationService.findAll(this.loadMoreNotificationsRequestNumber)
      .pipe()
      .subscribe(posts => {
        posts.forEach(async notification => {
          this.notifications.push(notification)
        })
      });
  }

  async onSearchChange() {
    if (this.searchControl.value.length > 0)
      await this.profileService.search(this.searchControl.value)
        .then(results => {
          this.options = results as unknown as Profile[]
          this.options.forEach(profile => {
          })
        })
    else this.options = []
  }

  logout() {
    localStorage.removeItem('currentProfile');
    this.authenticationService.logout()
  }

}
