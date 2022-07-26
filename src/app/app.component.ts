import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  intervalSub : ReturnType<any>;

  title = "Hello World";



  ngOnInit() {
   
  }

  ngOnDestroy() {
  
  }

}
