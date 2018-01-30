import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  text = 'Insert words lengths';
  userInput = '';



  constructor() {}



  addServerText(text : string) {
    this.text = this.text + '\n' + text;
  }

  addUserText(text : string) {
    this.text = this.text + '\n>' + text;
  }

  enterClick() {
     this.addUserText(this.userInput);
     this.userInput = '';
  }

}
