import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { EbService } from 'src/app/services/eb.service';
import { TsService } from 'src/app/services/ts.service';

@Component({
  selector: 'app-organizer-dashboard',
  templateUrl: './organizer-dashboard.component.html',
  styleUrls: ['./organizer-dashboard.component.css']
})
export class OrganizerDashboardComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(private tsService: TsService, private eventBusService: EbService) {

  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tsService.getToken();

    if (this.isLoggedIn) {
      const user = this.tsService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

  logout(): void {
    this.tsService.signOut();
    this.isLoggedIn = false;
    this.roles = [];
  }

  selectLogout() {
    this.tsService.signOut();
  }
}
