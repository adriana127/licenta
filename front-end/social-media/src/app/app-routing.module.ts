import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home-page/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile-page/profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  {
    path: 'home', component: HomeComponent
  },
  {path:"profile",component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
