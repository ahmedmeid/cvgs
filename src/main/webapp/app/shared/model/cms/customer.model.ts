export interface ICustomer {
    id?: number;
    name?: string;
    address?: string;
}

export class Customer implements ICustomer {
    constructor(public id?: number, public name?: string, public address?: string) {}
}
