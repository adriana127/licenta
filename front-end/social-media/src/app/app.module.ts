import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePostComponent } from './component/home-page/create-post/create-post.component';
import { NewsFeedComponent } from './component/home-page/news-feed/news-feed.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home-page/home/home.component';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatChipsModule} from '@angular/material/chips'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatCardModule} from '@angular/material/card';
import { StoriesComponent } from './component/home-page/stories/stories.component';
import { SuggestionsComponent } from './component/home-page/suggestions/suggestions.component'; 
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { httpInterceptorProviders } from './service/authentication/httpinterceptor.service';
import { ProfileComponent } from './component/profile-page/profile/profile.component';
import { EditProfileComponent } from './component/profile-page/edit-profile/edit-profile.component';
import { ProfileInformationComponent } from './component/profile-page/profile-information/profile-information.component';
import { ProfilePostsComponent } from './component/profile-page/profile-posts/profile-posts.component';
import { PostPopupComponent } from './component/post-page/post-popup/post-popup.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatBadgeModule} from '@angular/material/badge'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu'; 
import { CommentsSectionComponent } from './component/post-page/comments-section/comments-section.component';
import { FollowDetailsComponent } from './component/profile-page/follow-details/follow-details.component';
import { CurrentChatComponent } from './component/chat-page/current-chat/current-chat.component';
import { ActiveChatsComponent } from './component/chat-page/active-chats/active-chats.component';
import { ChatComponent } from './component/chat-page/chat/chat.component';
@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    NewsFeedComponent,
    HeaderComponent,
    StoriesComponent,
    SuggestionsComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    EditProfileComponent,
    ProfileInformationComponent,
    ProfilePostsComponent,
    PostPopupComponent,
    CommentsSectionComponent,
    FollowDetailsComponent,
    CurrentChatComponent,
    ActiveChatsComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents:[CreatePostComponent]
})
export class AppModule { }
