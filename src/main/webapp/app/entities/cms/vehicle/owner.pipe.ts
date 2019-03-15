import { Pipe, PipeTransform } from '@angular/core';
import { IVehicle } from 'app/shared/model/cms/vehicle.model';

@Pipe({
    name: 'owner',
    pure: false
})
export class OwnerPipe implements PipeTransform {
    transform(input: IVehicle[], owner) {
        const output: IVehicle[] = [];
        if (owner === 'ALL') {
            return input;
        } else {
            for (let i = 0; i < input.length; i++) {
                if (input[i].owner.name === owner) {
                    output.push(input[i]);
                }
            }
            return output;
        }
    }
}
