import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { VehicleConnectionStatus } from 'app/shared/model/vds/vehicle-connection-status.model';
import { VehicleConnectionStatusService } from './vehicle-connection-status.service';
import { VehicleConnectionStatusComponent } from './vehicle-connection-status.component';
import { VehicleConnectionStatusDetailComponent } from './vehicle-connection-status-detail.component';
import { VehicleConnectionStatusUpdateComponent } from './vehicle-connection-status-update.component';
import { VehicleConnectionStatusDeletePopupComponent } from './vehicle-connection-status-delete-dialog.component';
import { IVehicleConnectionStatus } from 'app/shared/model/vds/vehicle-connection-status.model';

@Injectable({ providedIn: 'root' })
export class VehicleConnectionStatusResolve implements Resolve<IVehicleConnectionStatus> {
    constructor(private service: VehicleConnectionStatusService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVehicleConnectionStatus> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<VehicleConnectionStatus>) => response.ok),
                map((vehicleConnectionStatus: HttpResponse<VehicleConnectionStatus>) => vehicleConnectionStatus.body)
            );
        }
        return of(new VehicleConnectionStatus());
    }
}

export const vehicleConnectionStatusRoute: Routes = [
    {
        path: '',
        component: VehicleConnectionStatusComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cvgsApp.vdsVehicleConnectionStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: VehicleConnectionStatusDetailComponent,
        resolve: {
            vehicleConnectionStatus: VehicleConnectionStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cvgsApp.vdsVehicleConnectionStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: VehicleConnectionStatusUpdateComponent,
        resolve: {
            vehicleConnectionStatus: VehicleConnectionStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cvgsApp.vdsVehicleConnectionStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: VehicleConnectionStatusUpdateComponent,
        resolve: {
            vehicleConnectionStatus: VehicleConnectionStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cvgsApp.vdsVehicleConnectionStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vehicleConnectionStatusPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: VehicleConnectionStatusDeletePopupComponent,
        resolve: {
            vehicleConnectionStatus: VehicleConnectionStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cvgsApp.vdsVehicleConnectionStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
