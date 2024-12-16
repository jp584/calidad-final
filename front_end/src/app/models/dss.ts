export interface DssTeamWinner {
    id?: number;
    name: string;
    profile: string;
    foundation: string;
    userId: number;
    status: boolean;

    count: number;
}

export interface DssPlayerGoal {
    id?: number;
    name: string;
    profile: string;
    ci: string;
    birthdate: string;
    positionId: number;
    teamId: number;
    status: boolean;

    goal: number;
}

export interface DssPlayerRedCard {
    id?: number;
    name: string;
    profile: string;
    ci: string;
    birthdate: string;
    positionId: number;
    teamId: number;
    status: boolean;

    red: number;
}

export interface DssPlayerYellowCard {
    id?: number;
    name: string;
    profile: string;
    ci: string;
    birthdate: string;
    positionId: number;
    teamId: number;
    status: boolean;

    yellow: number;
}