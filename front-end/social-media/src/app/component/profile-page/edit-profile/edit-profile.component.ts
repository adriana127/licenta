import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/model/profile';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: User;
  profile!: Profile
  constructor(private profileService: ProfileService,
    private authenticationService: AuthenticationService) {
    this.user = authenticationService.getCurrentUser()
  }
  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  loaded:boolean=false;
  imageName: any;  //Gets called when the user selects an image
  async ngOnInit() {

   await this.profileService.loadData()
   await this.profileService.getProfile(this.authenticationService.getCurrentUser()).then(data=>{
    this.profile=data;
  }).catch(err=>{console.log(err)})
    if (this.profile.photo === null)
    this.imgURL="../../assets/resources/user.png";
    else
      this.imgURL = "data:image/jpeg;base64," + this.profile.photo;
      this.loaded=true;
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
    this.profileService.updateProfile(this.profile, this.selectedFile).subscribe(
      data => {
        this.authenticationService.setCurrentUser(data.user)

      }, err => {
        alert(err.message)
      });
  }

}
