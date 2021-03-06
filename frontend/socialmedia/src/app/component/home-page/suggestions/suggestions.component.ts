import { Component, OnInit } from '@angular/core';
import { Suggestion } from 'src/app/model/suggestion';
import { User } from 'src/app/model/user';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {
  loaded: boolean = false;
  constructor(private profileService: ProfileService) {
  }

  suggestions: Suggestion[] = []
  async ngOnInit() {
    await this.profileService.getSuggestions().then(data => {
      data.forEach(profile => {
        this.suggestions.push({ profile: profile, disabled: false })
      });
    }).catch(err => { console.log(err) })
    this.loaded = true
  }

  async follow(user: User) {
    this.profileService.follow(user).subscribe(async () => {
      this.suggestions.forEach(value => {
        if (value.profile.user.id === user.id)
          value.disabled = true;
      });
      await this.delay(3000)
      this.suggestions = this.suggestions.filter(suggestion => suggestion.profile.user != user)
    });
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
