import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IVehicleData } from 'app/shared/model/vds/vehicle-data.model';
import { VehicleDataService } from './vehicle-data.service';

@Component({
    selector: 'jhi-vehicle-data-update',
    templateUrl: './vehicle-data-update.component.html'
})
export class VehicleDataUpdateComponent implements OnInit {
    vehicleData: IVehicleData;
    isSaving: boolean;
    timeStamp: string;

    constructor(protected vehicleDataService: VehicleDataService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ vehicleData }) => {
            this.vehicleData = vehicleData;
            this.timeStamp = this.vehicleData.timeStamp != null ? this.vehicleData.timeStamp.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.vehicleData.timeStamp = this.timeStamp != null ? moment(this.timeStamp, DATE_TIME_FORMAT) : null;
        if (this.vehicleData.id !== undefined) {
            this.subscribeToSaveResponse(this.vehicleDataService.update(this.vehicleData));
        } else {
            this.subscribeToSaveResponse(this.vehicleDataService.create(this.vehicleData));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IVehicleData>>) {
        result.subscribe((res: HttpResponse<IVehicleData>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
