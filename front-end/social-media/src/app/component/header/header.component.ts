import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: String

  constructor(private authenticationService: AuthenticationService) {
     this.username = authenticationService.getCurrentUser().username
     }
  ngOnInit(): void {
  }

}
