import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor() { 
  }  
  selectedFile!: File;
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
  
  }  

}
