import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Profile } from 'src/app/model/profile';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent  {
  profile!: Profile
  selectedFile!: File;
  loaded:boolean=false;
  imagePath: any;
  imgURL: any;

  constructor(private profileService: ProfileService,
              private authenticationService: AuthenticationService,
              private dialogRef: MatDialogRef<EditProfileComponent>) {
    this.profile=JSON.parse(JSON.stringify(this.profileService.getPersonalProfile()));
    this.imgURL=this.profile.photo
  }

  closeDialog(){
    this.dialogRef.close();
  }

  preview(files: any) {
    if (files.length === 0)
      return;
    this.selectedFile = files[0];
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result?.slice(23);
    }
  }

   saveProfile() {
    this.profileService.updateProfile(this.profile, this.selectedFile)
    .subscribe(async data => {
      this.authenticationService.setCurrentUser(data.user)
      await this.profileService.getProfile(data.user)
            .then(data => {
              this.profileService.setCurrentProfile(data)
                    this.closeDialog()
      window.location.reload();
            }).catch()

      }, err => {
        alert(err.message)
      });
  }

}
