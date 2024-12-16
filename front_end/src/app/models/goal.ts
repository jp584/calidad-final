export interface Goal {
    id?: number;
    gameId: number;
    playerId: number;
    goal: number;
    time: string;
    status: boolean;
}