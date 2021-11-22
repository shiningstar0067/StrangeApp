import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  public appTitle = "Strange";
  public currentUserName = "Test User";

  constructor(private service: MainService) { }

  ngOnInit(): void { 
    //this.currentUserName = this.service.currentUser.username;
  }

  fnLogout(){
    sessionStorage.clear();
  }
}
