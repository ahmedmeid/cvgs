import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVehicleConnectionStatus } from 'app/shared/model/vds/vehicle-connection-status.model';
import { AccountService } from 'app/core';
import { VehicleConnectionStatusService } from './vehicle-connection-status.service';

@Component({
    selector: 'jhi-vehicle-connection-status',
    templateUrl: './vehicle-connection-status.component.html'
})
export class VehicleConnectionStatusComponent implements OnInit, OnDestroy {
    vehicleConnectionStatuses: IVehicleConnectionStatus[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected vehicleConnectionStatusService: VehicleConnectionStatusService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.vehicleConnectionStatusService
            .query()
            .pipe(
                filter((res: HttpResponse<IVehicleConnectionStatus[]>) => res.ok),
                map((res: HttpResponse<IVehicleConnectionStatus[]>) => res.body)
            )
            .subscribe(
                (res: IVehicleConnectionStatus[]) => {
                    this.vehicleConnectionStatuses = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVehicleConnectionStatuses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVehicleConnectionStatus) {
        return item.id;
    }

    registerChangeInVehicleConnectionStatuses() {
        this.eventSubscriber = this.eventManager.subscribe('vehicleConnectionStatusListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
