import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IVehicleConnectionStatusHistory } from 'app/shared/model/vds/vehicle-connection-status-history.model';
import { VehicleConnectionStatusHistoryService } from './vehicle-connection-status-history.service';

@Component({
    selector: 'jhi-vehicle-connection-status-history-update',
    templateUrl: './vehicle-connection-status-history-update.component.html'
})
export class VehicleConnectionStatusHistoryUpdateComponent implements OnInit {
    vehicleConnectionStatusHistory: IVehicleConnectionStatusHistory;
    isSaving: boolean;
    statusAt: string;

    constructor(
        protected vehicleConnectionStatusHistoryService: VehicleConnectionStatusHistoryService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ vehicleConnectionStatusHistory }) => {
            this.vehicleConnectionStatusHistory = vehicleConnectionStatusHistory;
            this.statusAt =
                this.vehicleConnectionStatusHistory.statusAt != null
                    ? this.vehicleConnectionStatusHistory.statusAt.format(DATE_TIME_FORMAT)
                    : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.vehicleConnectionStatusHistory.statusAt = this.statusAt != null ? moment(this.statusAt, DATE_TIME_FORMAT) : null;
        if (this.vehicleConnectionStatusHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.vehicleConnectionStatusHistoryService.update(this.vehicleConnectionStatusHistory));
        } else {
            this.subscribeToSaveResponse(this.vehicleConnectionStatusHistoryService.create(this.vehicleConnectionStatusHistory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IVehicleConnectionStatusHistory>>) {
        result.subscribe(
            (res: HttpResponse<IVehicleConnectionStatusHistory>) => this.onSaveSuccess(),
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
