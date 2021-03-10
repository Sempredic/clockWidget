import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-project';

  date:string;
  hours:any;
  minutes:any;
  seconds:any;
  currentLocale: any;

  isTwelveHrFormat:false;
  test:any;
  constructor(){
   //   let now = moment(); // add this 2 of 4
     //navigator.language || navigator.userLanguage;

 //var test = moment('2016-01-24 14:23:45');

       //ja-JP;
 //de-DE
    setInterval(() =>{
   const currentDate = new Date();
   this.date = currentDate.toLocaleTimeString();
    }, 1000);
  }
}
