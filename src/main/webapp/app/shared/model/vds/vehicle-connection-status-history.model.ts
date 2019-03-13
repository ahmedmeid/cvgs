import { Moment } from 'moment';

export interface IVehicleConnectionStatusHistory {
    id?: number;
    vehicleId?: string;
    status?: string;
    statusAt?: Moment;
}

export class VehicleConnectionStatusHistory implements IVehicleConnectionStatusHistory {
    constructor(public id?: number, public vehicleId?: string, public status?: string, public statusAt?: Moment) {}
}
