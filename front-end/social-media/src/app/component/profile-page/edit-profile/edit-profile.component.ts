import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/model/profile';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: User;
  profile: Profile
  constructor(private profileService: ProfileService,
    private authenticationService: AuthenticationService) {
    this.user = authenticationService.getCurrentUser()
    this.profile = { id: 0, displayName: "", user: this.user, description: "", photo: null }
  }
  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  imageName: any;  //Gets called when the user selects an image
  async ngOnInit() {

    await this.profileService.loadData(this.user)
    this.profile=this.profileService.getProfile();
  //  this.profile = { id: 0, displayName: "", user: this.user, photo: null, description: "" }
    if (this.profile.photo === null)
      this.imgURL = "https://i.stack.imgur.com/y9DpT.jpg";
    else
      this.imgURL = "data:image/jpeg;base64," + this.profile.photo;
      console.log(this.imgURL)
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

  saveProfile() {
    console.log(this.selectedFile)
    this.profileService.updateProfile(this.profile, this.user, this.selectedFile).subscribe(
      data => {
        console.log(data)
      }, err => {
        alert(err.message)
      });
  }

}
