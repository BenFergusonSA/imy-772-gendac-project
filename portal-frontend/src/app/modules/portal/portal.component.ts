import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.less']
})
export class PortalComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
  }

  async logout(): Promise<void> {
    await this.authService.signOut();
    this.router.navigate(['/']);
  }

}
