import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/service/post.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';
import { MatDialogRef } from '@angular/material/dialog';
import { Profile } from 'src/app/model/profile';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  constructor(private postService: PostService,
              private authenticationService: AuthenticationService,
              private dialogRef: MatDialogRef<CreatePostComponent>,
              private profileService:ProfileService) {
    this.post = { id: 0, user: this.authenticationService.getCurrentUser(), description: "", createdOn: new Date(), likes: [], comments: [], tags: [], photo: "" };
    this.imgURL = "https://i.stack.imgur.com/y9DpT.jpg";
  }

  post!: Post;
  selectedFile!: File;
  imgURL: any;
  searchControl = new FormControl();
  options:Profile[]=[]
  selectedUsers: User[] = [];
  chipBoxUsers: String[] = [];
  @ViewChild('profileInput') profileInput!: ElementRef;
 
  preview(files: any) {
    if (files.length === 0)
      return;
    this.selectedFile = files[0];
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  async onSearchChange(){
    if(this.searchControl.value.length>0)
      await this.profileService.search(this.searchControl.value)
      .then(results=>{
        this.options=results as unknown as Profile[]
        this.options.forEach(profile=>{
        })
      })
    else this.options=[]
  }

  onUpload() {
    this.post.tags=this.selectedUsers
    this.postService.createPost(this.post, this.selectedFile)
      .subscribe((response) => {
        alert(response)
        this.closeDialog()
      }
      );
  }

  closeDialog(){
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    if (( event.value || '').trim())
      this.chipBoxUsers.push( event.value);
    if (event.input) 
      event.input.value = '';
    this.searchControl.setValue(null);
  }

  remove(nickname: String): void {
    const index = this.chipBoxUsers.indexOf(nickname);
    if (index >= 0) {
      this.chipBoxUsers.splice(index, 1);
      this.selectedUsers=this.selectedUsers.filter(profile=>profile.nickname!=nickname)
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.chipBoxUsers.push(event.option.value.nickname);
    this.selectedUsers.push(event.option.value)
    this.profileInput.nativeElement.value = '';
    this.searchControl.setValue(null);
  }

}
