export interface User {
    id: number;
    username: string;
    email: string;
    roles: [{
        id: number;
        name: string;
    }]
    status: boolean;
}
