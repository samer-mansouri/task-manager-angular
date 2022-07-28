import { Component, OnInit } from '@angular/core';
import { faUsers, faDiagramProject, faLayerGroup, faListCheck, faHouse, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

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
  faRightFromBracket = faRightFromBracket;

  constructor() { }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.removeItem('user');
    window.location.reload();
  }

}
