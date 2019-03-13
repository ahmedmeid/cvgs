import { ICustomer } from 'app/shared/model/cms/customer.model';

export interface IVehicle {
    id?: number;
    vehicleId?: string;
    vehicleRegNo?: string;
    owner?: ICustomer;
}

export class Vehicle implements IVehicle {
    constructor(public id?: number, public vehicleId?: string, public vehicleRegNo?: string, public owner?: ICustomer) {}
}
