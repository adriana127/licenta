import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/service/post.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  constructor(private httpClient: HttpClient,private postService: PostService) { 
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }  
  selectedFile!: File;
  post: Post={id:0,user:{id:1,email:"Adriana",password:"12345",username:"",role:{id:0,name:"user"},followers:null,following:null},description:"",createdOn:new Date(),likes:[],comments:[],tags:[],photo:""};
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  imageName: any;  //Gets called when the user selects an image
  ngOnInit(): void {
    this.imgURL="https://i.stack.imgur.com/y9DpT.jpg";
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
    }}
  

   clickUpload (): void{
    document.getElementById("fileupload")?.click();
}

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
console.log(this.selectedFile)
    //Make a call to the Spring Boot Application to save the image
    this.postService.createPost(this.post,this.selectedFile)
      .subscribe((response) => {
        // if (response.status === 200) {
        //   this.message = 'Image uploaded successfully';
        // } else {
        //   this.message = 'Image not uploaded successfully';
        // }
        alert(response)
      }
      );
  }  
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput!: ElementRef;

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}
