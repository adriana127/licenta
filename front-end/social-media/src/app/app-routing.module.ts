import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './component/chat-page/chat/chat.component';
import { CurrentChatComponent } from './component/chat-page/current-chat/current-chat.component';
import { HomeComponent } from './component/home-page/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile-page/profile/profile.component';
import { AuthGuard } from './service/authentication/authorizationguard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "chat", component: CurrentChatComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
