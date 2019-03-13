import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVehicleConnectionStatusHistory } from 'app/shared/model/vds/vehicle-connection-status-history.model';
import { AccountService } from 'app/core';
import { VehicleConnectionStatusHistoryService } from './vehicle-connection-status-history.service';

@Component({
    selector: 'jhi-vehicle-connection-status-history',
    templateUrl: './vehicle-connection-status-history.component.html'
})
export class VehicleConnectionStatusHistoryComponent implements OnInit, OnDestroy {
    vehicleConnectionStatusHistories: IVehicleConnectionStatusHistory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected vehicleConnectionStatusHistoryService: VehicleConnectionStatusHistoryService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.vehicleConnectionStatusHistoryService
            .query()
            .pipe(
                filter((res: HttpResponse<IVehicleConnectionStatusHistory[]>) => res.ok),
                map((res: HttpResponse<IVehicleConnectionStatusHistory[]>) => res.body)
            )
            .subscribe(
                (res: IVehicleConnectionStatusHistory[]) => {
                    this.vehicleConnectionStatusHistories = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVehicleConnectionStatusHistories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVehicleConnectionStatusHistory) {
        return item.id;
    }

    registerChangeInVehicleConnectionStatusHistories() {
        this.eventSubscriber = this.eventManager.subscribe('vehicleConnectionStatusHistoryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
