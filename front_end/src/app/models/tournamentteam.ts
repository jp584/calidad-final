import { Team } from "./team";

export interface TournamentTeam {
    id?: number;
    teamId: number;
    tournamentId: number;
    status: boolean;
}