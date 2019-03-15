import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVehicle } from 'app/shared/model/cms/vehicle.model';
import { AccountService } from 'app/core';
import { VehicleService } from './vehicle.service';
import { SocketService } from './socket.service';
import * as SockJS from 'sockjs-client';
import { VehicleConnectionStatusService } from 'app/entities/vds/vehicle-connection-status';
import { IVehicleConnectionStatus } from 'app/shared/model/vds/vehicle-connection-status.model';
import { ICustomer } from 'app/shared/model/cms/customer.model';
import { CustomerService } from 'app/entities/cms/customer';

@Component({
    selector: 'jhi-vehicle',
    templateUrl: './vehicle.component.html'
})
export class VehicleComponent implements OnInit, OnDestroy {
    vehicles: IVehicle[];
    customers: ICustomer[];
    vehiclesConnectionStatus: IVehicleConnectionStatus[];
    vehiclesConnectionStatusMap: Object = {};
    socket: SockJS;
    currentAccount: any;
    eventSubscriber: Subscription;
    filterByStatus = 'ALL';
    filterByOwner = 'ALL';

    constructor(
        protected vehicleService: VehicleService,
        protected vehicleConnectionStatusService: VehicleConnectionStatusService,
        protected customerService: CustomerService,
        protected socketService: SocketService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.vehicleService
            .query()
            .pipe(
                filter((res: HttpResponse<IVehicle[]>) => res.ok),
                map((res: HttpResponse<IVehicle[]>) => res.body)
            )
            .subscribe(
                (res: IVehicle[]) => {
                    this.vehicles = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.customerService
            .query()
            .pipe(
                filter((res: HttpResponse<ICustomer[]>) => res.ok),
                map((res: HttpResponse<ICustomer[]>) => res.body)
            )
            .subscribe(
                (res: ICustomer[]) => {
                    this.customers = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.vehicleConnectionStatusService
            .query()
            .pipe(
                filter((res: HttpResponse<IVehicleConnectionStatus[]>) => res.ok),
                map((res: HttpResponse<IVehicleConnectionStatus[]>) => res.body)
            )
            .subscribe(
                (res: IVehicleConnectionStatus[]) => {
                    this.vehiclesConnectionStatus = res;
                    this.vehiclesConnectionStatusMap = res.reduce(function(mapi, obj) {
                        mapi[obj.vehicleId] = obj;
                        return mapi;
                    }, {});
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVehicles();
        this.socket = this.socketService.initSocket();
        const self = this;
        this.socket.onmessage = function(e) {
            const message = JSON.parse(e.data);
            console.log('received a message: ' + JSON.stringify(message));
            self.vehiclesConnectionStatusMap[message.vehicleId].status = message.status;
            self.vehiclesConnectionStatusMap[message.vehicleId].lastUpdated = new Date();
        };
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVehicle) {
        return item.id;
    }

    registerChangeInVehicles() {
        this.eventSubscriber = this.eventManager.subscribe('vehicleListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    onChangeStatus(optionFromMenu) {
        this.filterByStatus = optionFromMenu;
    }

    onChangeOwner(optionFromMenu) {
        this.filterByOwner = optionFromMenu;
    }
}
