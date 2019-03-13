import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IVehicleConnectionStatus } from 'app/shared/model/vds/vehicle-connection-status.model';
import { VehicleConnectionStatusService } from './vehicle-connection-status.service';

@Component({
    selector: 'jhi-vehicle-connection-status-update',
    templateUrl: './vehicle-connection-status-update.component.html'
})
export class VehicleConnectionStatusUpdateComponent implements OnInit {
    vehicleConnectionStatus: IVehicleConnectionStatus;
    isSaving: boolean;
    lastUpdated: string;

    constructor(protected vehicleConnectionStatusService: VehicleConnectionStatusService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ vehicleConnectionStatus }) => {
            this.vehicleConnectionStatus = vehicleConnectionStatus;
            this.lastUpdated =
                this.vehicleConnectionStatus.lastUpdated != null ? this.vehicleConnectionStatus.lastUpdated.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.vehicleConnectionStatus.lastUpdated = this.lastUpdated != null ? moment(this.lastUpdated, DATE_TIME_FORMAT) : null;
        if (this.vehicleConnectionStatus.id !== undefined) {
            this.subscribeToSaveResponse(this.vehicleConnectionStatusService.update(this.vehicleConnectionStatus));
        } else {
            this.subscribeToSaveResponse(this.vehicleConnectionStatusService.create(this.vehicleConnectionStatus));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IVehicleConnectionStatus>>) {
        result.subscribe(
            (res: HttpResponse<IVehicleConnectionStatus>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
