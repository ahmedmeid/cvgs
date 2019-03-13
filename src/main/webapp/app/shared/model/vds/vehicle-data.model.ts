import { Moment } from 'moment';

export interface IVehicleData {
    id?: number;
    vehicleId?: string;
    longitude?: string;
    latitude?: string;
    speed?: number;
    fuelLevel?: number;
    timeStamp?: Moment;
}

export class VehicleData implements IVehicleData {
    constructor(
        public id?: number,
        public vehicleId?: string,
        public longitude?: string,
        public latitude?: string,
        public speed?: number,
        public fuelLevel?: number,
        public timeStamp?: Moment
    ) {}
}
