import { Game } from "./game";
import { TournamentTeam } from "./tournamentteam";

export interface Tournament {
    id?: number;
    name: string;
    number: number;
    round: number;
    start: string;
    finish: string;
    status: boolean;
}
