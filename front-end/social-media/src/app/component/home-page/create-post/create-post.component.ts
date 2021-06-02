import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/service/post.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  constructor(private postService: PostService,
    private authenticationService: AuthenticationService,
    private userService: UserService) {
    this.post = { id: 0, user: this.authenticationService.getCurrentUser(), description: "", createdOn: new Date(), likes: [], comments: [], tags: [], photo: "" };

  }
  async reloadData() {
    await this.userService.loadData()
    this.allUsers = this.userService.getAllUsers()
    // this.filteredUsers = this.formControl.valueChanges
    //   .pipe(
    //     startWith('' || null),
    //     map(username => username ? this._filter(username) : this.allUsers.slice()));
        
  }
  post: Post;
  retrieveResonse: any;
  selectedFile!: File;

  async ngOnInit(){
    await this.reloadData()
    this.imgURL = "https://i.stack.imgur.com/y9DpT.jpg";
    this.filteredUsers = this.formControl.valueChanges
      .pipe(
        startWith('' || null),
        map(username => username ? this._filter(username) : this.allUsers.slice()));
        
  }

  public imagePath: any;
  imgURL: any;
  public message!: string;

  preview(files: any) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    this.selectedFile = files[0];

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }


  clickUpload(): void {
    document.getElementById("fileupload")?.click();
  }

  onUpload() {
    this.post.tags=this.selectedUsers
    this.postService.createPost(this.post, this.selectedFile)
      .subscribe((response) => {
        alert(response)
      }
      );
  }
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;

  formControl = new FormControl();
  filteredUsers!: Observable<User[]>;
  allUsers: User[] = [];
  selectedUsers: any[] = [];

  chipBoxUsers: String[] = [];

  @ViewChild('fruitInput') fruitInput!: ElementRef;

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.chipBoxUsers.push(value);
    }
    if (input) {
      input.value = '';
    }
    this.formControl.setValue(null);
  }

  remove(fruit: String): void {
    const index = this.chipBoxUsers.indexOf(fruit);
    if (index >= 0) {
      this.chipBoxUsers.splice(index, 1);
      this.selectedUsers.forEach((item, index) => {
        if (item === this.userService.getByUsername(fruit))
          this.selectedUsers.splice(index, 1);
      });

    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.chipBoxUsers.push(event.option.value);
    this.selectedUsers.push(this.userService.getByUsername(event.option.value))
    this.allUsers.forEach((item, index) => {
      if (item === this.userService.getByUsername(event.option.value))
        this.selectedUsers.splice(index, 1);
    });
    this.fruitInput.nativeElement.value = '';
    this.formControl.setValue(null);
  }

  private _filter(fullname: string): User[] {
    const filterValue = fullname.toLowerCase();
    return this.allUsers.filter(option => option.username.toLowerCase().indexOf(filterValue) === 0);
  }
}
