import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVehicleData } from 'app/shared/model/vds/vehicle-data.model';

@Component({
    selector: 'jhi-vehicle-data-detail',
    templateUrl: './vehicle-data-detail.component.html'
})
export class VehicleDataDetailComponent implements OnInit {
    vehicleData: IVehicleData;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vehicleData }) => {
            this.vehicleData = vehicleData;
        });
    }

    previousState() {
        window.history.back();
    }
}
