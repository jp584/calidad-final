import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BearerInterceptor } from './interceptors/bearer.interceptor';
import { CommonModule } from '@angular/common'; // Importamos CommonModule
import { AuthenticationGuard } from './guards/authentication.guard';
import { CoachDashboardComponent } from './components/coach-dashboard/coach-dashboard.component';
import { RefereeDashboardComponent } from './components/referee-dashboard/referee-dashboard.component';
import { OrganizerDashboardComponent } from './components/organizer-dashboard/organizer-dashboard.component';
import { CoachTournamentComponent } from './components/coach-tournament/coach-tournament.component';
import { CoachGameComponent } from './components/coach-game/coach-game.component';
import { CoachTeamComponent } from './components/coach-team/coach-team.component';
import { RefereeTournamentComponent } from './components/referee-tournament/referee-tournament.component';
import { RefereeTeamComponent } from './components/referee-team/referee-team.component';
import { RefereeGameComponent } from './components/referee-game/referee-game.component';
import { CoachPlayerComponent } from './components/coach-player/coach-player.component';
import { OrganizerTournamentComponent } from './components/organizer-tournament/organizer-tournament.component';
import { OrganizerTeamComponent } from './components/organizer-team/organizer-team.component';
import { OrganizerGameComponent } from './components/organizer-game/organizer-game.component';
import { RefereePlayerComponent } from './components/referee-player/referee-player.component';
import { OrganizerPlayerComponent } from './components/organizer-player/organizer-player.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { CoachDssComponent } from './components/coach-dss/coach-dss.component';
import { OrganizerDssComponent } from './components/organizer-dss/organizer-dss.component';
import { OrganizerPasswordComponent } from './components/organizer-password/organizer-password.component';
import { OrganizerUserComponent } from './components/organizer-user/organizer-user.component';
import { RefereeGoalComponent } from './components/referee-goal/referee-goal.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CoachDashboardComponent,
    RefereeDashboardComponent,
    OrganizerDashboardComponent,
    CoachTournamentComponent,
    CoachGameComponent,
    CoachTeamComponent,
    RefereeTournamentComponent,
    RefereeTeamComponent,
    RefereeGameComponent,
    CoachPlayerComponent,
    OrganizerTournamentComponent,
    OrganizerTeamComponent,
    OrganizerGameComponent,
    RefereePlayerComponent,
    OrganizerPlayerComponent,
    CoachDssComponent,
    OrganizerDssComponent,
    OrganizerPasswordComponent,
    OrganizerUserComponent,
    RefereeGoalComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,  // Añadimos CommonModule a las importaciones
    GoogleMapsModule
  ],
  providers: [AuthenticationGuard, { provide: HTTP_INTERCEPTORS, useClass: BearerInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
