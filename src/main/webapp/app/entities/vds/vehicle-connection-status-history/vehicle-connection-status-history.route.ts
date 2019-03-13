import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { VehicleConnectionStatusHistory } from 'app/shared/model/vds/vehicle-connection-status-history.model';
import { VehicleConnectionStatusHistoryService } from './vehicle-connection-status-history.service';
import { VehicleConnectionStatusHistoryComponent } from './vehicle-connection-status-history.component';
import { VehicleConnectionStatusHistoryDetailComponent } from './vehicle-connection-status-history-detail.component';
import { VehicleConnectionStatusHistoryUpdateComponent } from './vehicle-connection-status-history-update.component';
import { VehicleConnectionStatusHistoryDeletePopupComponent } from './vehicle-connection-status-history-delete-dialog.component';
import { IVehicleConnectionStatusHistory } from 'app/shared/model/vds/vehicle-connection-status-history.model';

@Injectable({ providedIn: 'root' })
export class VehicleConnectionStatusHistoryResolve implements Resolve<IVehicleConnectionStatusHistory> {
    constructor(private service: VehicleConnectionStatusHistoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVehicleConnectionStatusHistory> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<VehicleConnectionStatusHistory>) => response.ok),
                map((vehicleConnectionStatusHistory: HttpResponse<VehicleConnectionStatusHistory>) => vehicleConnectionStatusHistory.body)
            );
        }
        return of(new VehicleConnectionStatusHistory());
    }
}

export const vehicleConnectionStatusHistoryRoute: Routes = [
    {
        path: '',
        component: VehicleConnectionStatusHistoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cvgsApp.vdsVehicleConnectionStatusHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: VehicleConnectionStatusHistoryDetailComponent,
        resolve: {
            vehicleConnectionStatusHistory: VehicleConnectionStatusHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cvgsApp.vdsVehicleConnectionStatusHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: VehicleConnectionStatusHistoryUpdateComponent,
        resolve: {
            vehicleConnectionStatusHistory: VehicleConnectionStatusHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cvgsApp.vdsVehicleConnectionStatusHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: VehicleConnectionStatusHistoryUpdateComponent,
        resolve: {
            vehicleConnectionStatusHistory: VehicleConnectionStatusHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cvgsApp.vdsVehicleConnectionStatusHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vehicleConnectionStatusHistoryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: VehicleConnectionStatusHistoryDeletePopupComponent,
        resolve: {
            vehicleConnectionStatusHistory: VehicleConnectionStatusHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cvgsApp.vdsVehicleConnectionStatusHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
