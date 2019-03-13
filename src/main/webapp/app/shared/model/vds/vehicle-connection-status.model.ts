import { Moment } from 'moment';

export const enum ConnectionStatus {
    CONNECTED = 'CONNECTED',
    DISCONNECTED = 'DISCONNECTED'
}

export interface IVehicleConnectionStatus {
    id?: number;
    vehicleId?: string;
    status?: ConnectionStatus;
    lastUpdated?: Moment;
}

export class VehicleConnectionStatus implements IVehicleConnectionStatus {
    constructor(public id?: number, public vehicleId?: string, public status?: ConnectionStatus, public lastUpdated?: Moment) {}
}
