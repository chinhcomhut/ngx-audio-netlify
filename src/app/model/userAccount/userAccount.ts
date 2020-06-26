export class UserAccount {
    id?: number;
    avatar?: string;
    name?: string

    constructor(id: number, avatar: string, name: string) {
        this.id = id;
        this.avatar = avatar
        this.name = name;
    }
}
