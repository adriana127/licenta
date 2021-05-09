import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { fromEventPattern } from 'rxjs';
import { HomeComponent } from './component/home-page/home/home.component';

const routes: Routes = [
  { path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
