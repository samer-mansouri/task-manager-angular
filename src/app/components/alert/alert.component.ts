import { Component, Input, OnInit } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {


  @Input('color') color: string = 'info';
  @Input('message') message: string = 'Info';
  
  faBell = faBell;

  constructor() { }

  ngOnInit(): void {
  }

}
