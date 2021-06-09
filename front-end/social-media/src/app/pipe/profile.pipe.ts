import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profile'
})
export class ProfilePipe implements PipeTransform {

  transform(value: String): String {
    if (value != null)
    return "data:image/png;base64," + value
        else
    return "assets/resources/user.png"
  }
}
