import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePostComponent } from './component/home-page/create-post/create-post.component';
import { NewsFeedComponent } from './component/home-page/news-feed/news-feed.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
import { httpInterceptorProviders } from './service/httpinterceptor.service';
import { ProfileComponent } from './component/profile-page/profile/profile.component';
import { EditProfileComponent } from './component/profile-page/edit-profile/edit-profile.component';
import { ProfileInformationComponent } from './component/profile-page/profile-information/profile-information.component';
import { ProfilePostsComponent } from './component/profile-page/profile-posts/profile-posts.component';
import { PostPopupComponent } from './component/post-popup/post-popup.component';
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
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents:[CreatePostComponent]
})
export class AppModule { }
