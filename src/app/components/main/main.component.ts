import { Component, OnInit } from '@angular/core';
import { faUsers, faDiagramProject, faLayerGroup, faListCheck, faHouse, faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  faUsers = faUsers;
  faDiagramProject = faDiagramProject;
  faLayerGroup = faLayerGroup;
  faListCheck = faListCheck;
  faHouse = faHouse;
  faGear = faGear;

  constructor() { }

  ngOnInit(): void {
  }

}
