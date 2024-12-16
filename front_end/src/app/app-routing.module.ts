import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { CoachDashboardComponent } from './components/coach-dashboard/coach-dashboard.component';
import { RefereeDashboardComponent } from './components/referee-dashboard/referee-dashboard.component';
import { OrganizerDashboardComponent } from './components/organizer-dashboard/organizer-dashboard.component';
import { CoachTournamentComponent } from './components/coach-tournament/coach-tournament.component';
import { CoachTeamComponent } from './components/coach-team/coach-team.component';
import { CoachGameComponent } from './components/coach-game/coach-game.component';
import { RefereeTournamentComponent } from './components/referee-tournament/referee-tournament.component';
import { RefereeTeamComponent } from './components/referee-team/referee-team.component';
import { RefereeGameComponent } from './components/referee-game/referee-game.component';
import { CoachPlayerComponent } from './components/coach-player/coach-player.component';
import { OrganizerTournamentComponent } from './components/organizer-tournament/organizer-tournament.component';
import { OrganizerTeamComponent } from './components/organizer-team/organizer-team.component';
import { OrganizerGameComponent } from './components/organizer-game/organizer-game.component';
import { RefereePlayerComponent } from './components/referee-player/referee-player.component';
import { OrganizerPlayerComponent } from './components/organizer-player/organizer-player.component';
import { CoachDssComponent } from './components/coach-dss/coach-dss.component';
import { OrganizerDssComponent } from './components/organizer-dss/organizer-dss.component';
import { OrganizerUserComponent } from './components/organizer-user/organizer-user.component';
import { OrganizerPasswordComponent } from './components/organizer-password/organizer-password.component';
import { RefereeGoalComponent } from './components/referee-goal/referee-goal.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'coachdashboard',
    component: CoachDashboardComponent,
    canActivate: [AuthenticationGuard],
    data: {
      roles: ['ROLE_COACH']
    },
    children: [
      {
        path: '',
        redirectTo: 'coachtournament',
        pathMatch: 'full'
      },
      {
        path: 'coachtournament',
        component: CoachTournamentComponent
      },
      {
        path: 'coachteam',
        component: CoachTeamComponent
      },
      {
        path: 'coachplayer',
        component: CoachPlayerComponent
      },
      {
        path: 'coachgame',
        component: CoachGameComponent
      },
      {
        path: 'coachdss',
        component: CoachDssComponent
      }

    ]
  },
  {
    path: 'refereedashboard',
    component: RefereeDashboardComponent,
    canActivate: [AuthenticationGuard],
    data: {
      roles: ['ROLE_REFEREE']
    },
    children: [
      {
        path: '',
        redirectTo: 'refereetournament',
        pathMatch: 'full'
      },
      {
        path: 'refereetournament',
        component: RefereeTournamentComponent
      },
      {
        path: 'refereeteam',
        component: RefereeTeamComponent
      },
      {
        path: 'refereeplayer',
        component: RefereePlayerComponent
      },
      {
        path: 'refereegame',
        component: RefereeGameComponent
      },
      {
        path: 'refereegoal',
        component: RefereeGoalComponent
      }
    ]
  },
  {
    path: 'organizerdashboard',
    component: OrganizerDashboardComponent,
    canActivate: [AuthenticationGuard],
    data: {
      roles: ['ROLE_ORGANIZER']
    },
    children: [
      {
        path: '',
        redirectTo: 'organizertournament',
        pathMatch: 'full'
      },
      {
        path: 'organizertournament',
        component: OrganizerTournamentComponent
      },
      {
        path: 'organizerteam',
        component: OrganizerTeamComponent
      },
      {
        path: 'organizerplayer',
        component: OrganizerPlayerComponent
      },
      {
        path: 'organizergame',
        component: OrganizerGameComponent
      },
      {
        path: 'organizerdss',
        component: OrganizerDssComponent
      },
      {
        path: 'organizeruser',
        component: OrganizerUserComponent
      },
      {
        path: 'organizerpassword',
        component: OrganizerPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
