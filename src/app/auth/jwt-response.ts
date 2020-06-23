export class JwtResponse {
    accessToken: string;
    type: string;
    username: string;
    roles: any[];
    constructor(accessToken: string, type: string,username: string, roles: any) {
        this.accessToken = accessToken;
        this.type = type;
        this.username = username;
        this.roles = roles;
    }
}
