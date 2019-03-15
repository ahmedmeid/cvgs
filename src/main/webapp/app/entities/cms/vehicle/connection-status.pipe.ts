import { Pipe, PipeTransform } from '@angular/core';
import { IVehicle } from 'app/shared/model/cms/vehicle.model';

@Pipe({
    name: 'connectionstatus',
    pure: false
})
export class ConnectionStatusPip implements PipeTransform {
    transform(input: IVehicle[], vehiclesConnectionStatusMap, connectionStatus) {
        const output: IVehicle[] = [];
        if (connectionStatus === 'ALL') {
            return input;
        } else {
            for (let i = 0; i < input.length; i++) {
                if (vehiclesConnectionStatusMap[input[i].vehicleId].status === connectionStatus) {
                    output.push(input[i]);
                }
            }
            return output;
        }
    }
}
