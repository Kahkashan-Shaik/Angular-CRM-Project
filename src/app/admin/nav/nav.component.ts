import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminRoutingModule } from '../admin-routing.module';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router:AdminRoutingModule, private authobj: AuthService) { }
  logout(){
    this.authobj.logout();
  }
  ngOnInit(): void {
  }

}
