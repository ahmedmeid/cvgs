import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVehicleConnectionStatus } from 'app/shared/model/vds/vehicle-connection-status.model';

@Component({
    selector: 'jhi-vehicle-connection-status-detail',
    templateUrl: './vehicle-connection-status-detail.component.html'
})
export class VehicleConnectionStatusDetailComponent implements OnInit {
    vehicleConnectionStatus: IVehicleConnectionStatus;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vehicleConnectionStatus }) => {
            this.vehicleConnectionStatus = vehicleConnectionStatus;
        });
    }

    previousState() {
        window.history.back();
    }
}
