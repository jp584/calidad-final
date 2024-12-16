export interface Game {
    id?: number;
    tournamentId: number;
    tournamentTeamAId: number;
    tournamentTeamBId: number;
    tournamentTeamWinnerId: number;
    userId: number;
    gameDate: string;
    round: number;
    latitude: number;
    longitude: number;
    status: boolean;
}
