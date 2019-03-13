import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVehicleConnectionStatusHistory } from 'app/shared/model/vds/vehicle-connection-status-history.model';

@Component({
    selector: 'jhi-vehicle-connection-status-history-detail',
    templateUrl: './vehicle-connection-status-history-detail.component.html'
})
export class VehicleConnectionStatusHistoryDetailComponent implements OnInit {
    vehicleConnectionStatusHistory: IVehicleConnectionStatusHistory;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vehicleConnectionStatusHistory }) => {
            this.vehicleConnectionStatusHistory = vehicleConnectionStatusHistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
