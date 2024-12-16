export interface LoginResponse {
    id: string;
    username: string;
    email: string;
    roles: [string];
    accessToken: string;
    refreshToken: string;
    tokenType: string;
}
