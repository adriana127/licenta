import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private profileSerice:ProfileService) { 
    this.profileForm = new FormGroup({
      // username: new FormControl('', [
      //   Validators.required

      // ]),
      displayName: new FormControl('',
        [Validators.required,
        ]),
        description: new FormControl('',
        [Validators.required,
        ]),
        photo: new FormControl('',
        [Validators.required,
        ])
    });
  }  
  profileForm: any;
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

saveProfile() {
  this.profileSerice.updateProfile(this.profileForm.getRawValue()).subscribe(
    data=>{

    } ,err => {
      alert(err.message)
    });
  }  

}
