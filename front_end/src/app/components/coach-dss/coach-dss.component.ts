import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DssPlayerGoal, DssPlayerRedCard, DssPlayerYellowCard, DssTeamWinner } from 'src/app/models/dss';
import { Player } from 'src/app/models/player';
import { Team } from 'src/app/models/team';
import { DssService } from 'src/app/services/dss.service';

@Component({
  selector: 'app-coach-dss',
  templateUrl: './coach-dss.component.html',
  styleUrls: ['./coach-dss.component.css']
})
export class CoachDssComponent {
  teamsWinners: DssTeamWinner[] | undefined;
  playersGoals: DssPlayerGoal[] | undefined;
  playersRedCards: DssPlayerRedCard[] | undefined;
  playersYellowCards: DssPlayerYellowCard[] | undefined;
  public chartWins: any;
  public chartGoals: any;
  public chartRedCards: any;
  public chartYellowCards: any;

  constructor(private dssService: DssService) { }

  ngOnInit() {
    this.dssService.getTeamWinnerCountByUserId().subscribe((data: DssTeamWinner[]) => {
      this.teamsWinners = data;
      this.createChart();
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });

    this.dssService.getPlayerGoalCountByUserId().subscribe((data: DssPlayerGoal[]) => {
      this.playersGoals = data;
      this.createPlayerGoalsChart();
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });

    this.dssService.getPlayerRedCardCountByUserId().subscribe((data: DssPlayerRedCard[]) => {
      this.playersRedCards = data;
      this.createPlayerRedCardChart();
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });

    this.dssService.getPlayerYellowCardCountByUserId().subscribe((data: DssPlayerYellowCard[]) => {
      this.playersYellowCards = data;
      this.createPlayerYellowCardChart();
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  createChart() {
    this.chartWins = new Chart("Wins", {
      type: 'doughnut',

      data: {
        labels: this.teamsWinners?.map((teamsWinner) => { return teamsWinner.name }),
        datasets: [
          {
            label: "Games won by team",
            data: this.teamsWinners?.map((teamsWinner) => { return teamsWinner.count !== undefined ? teamsWinner.count! : 0 }),
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  createPlayerGoalsChart() {
    this.chartGoals = new Chart("Goals", {
      type: 'bar',

      data: {
        labels: this.playersGoals?.map((playersGoal) => { return playersGoal.name }),
        datasets: [
          {
            label: "Top players goals",
            data: this.playersGoals?.map((playersGoal) => { return playersGoal.goal !== undefined ? playersGoal.goal! : 0 }),
            backgroundColor: 'Green'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  createPlayerRedCardChart() {
    this.chartRedCards = new Chart("RedCards", {
      type: 'bar',

      data: {
        labels: this.playersRedCards?.map((playersRedCard) => { return playersRedCard.name }),
        datasets: [
          {
            label: "Red cards",
            data: this.playersRedCards?.map((playersRedCard) => { return playersRedCard.red !== undefined ? playersRedCard.red! : 0 }),
            backgroundColor: 'red'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  createPlayerYellowCardChart() {
    this.chartRedCards = new Chart("YellowCards", {
      type: 'bar',

      data: {
        labels: this.playersYellowCards?.map((playersYellowCard) => { return playersYellowCard.name }),
        datasets: [
          {
            label: "Yellow cards",
            data: this.playersYellowCards?.map((playersYellowCard) => { return playersYellowCard.yellow !== undefined ? playersYellowCard.yellow! : 0 }),
            backgroundColor: 'yellow'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
}
