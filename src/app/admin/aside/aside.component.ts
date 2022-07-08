import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  avatarImageUrl:any;
  constructor(public router: Router ) { }

  ngOnInit(): void {
    this.avatarImageUrl = environment.ImagePathForAdminFiles;
    
  }

}
