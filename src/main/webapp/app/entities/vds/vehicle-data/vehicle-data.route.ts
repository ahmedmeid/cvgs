import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { VehicleData } from 'app/shared/model/vds/vehicle-data.model';
import { VehicleDataService } from './vehicle-data.service';
import { VehicleDataComponent } from './vehicle-data.component';
import { VehicleDataDetailComponent } from './vehicle-data-detail.component';
import { VehicleDataUpdateComponent } from './vehicle-data-update.component';
import { VehicleDataDeletePopupComponent } from './vehicle-data-delete-dialog.component';
import { IVehicleData } from 'app/shared/model/vds/vehicle-data.model';

@Injectable({ providedIn: 'root' })
export class VehicleDataResolve implements Resolve<IVehicleData> {
    constructor(private service: VehicleDataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVehicleData> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<VehicleData>) => response.ok),
                map((vehicleData: HttpResponse<VehicleData>) => vehicleData.body)
            );
        }
        return of(new VehicleData());
    }
}

export const vehicleDataRoute: Routes = [
    {
        path: '',
        component: VehicleDataComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'cvgsApp.vdsVehicleData.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: VehicleDataDetailComponent,
        resolve: {
            vehicleData: VehicleDataResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cvgsApp.vdsVehicleData.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: VehicleDataUpdateComponent,
        resolve: {
            vehicleData: VehicleDataResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cvgsApp.vdsVehicleData.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: VehicleDataUpdateComponent,
        resolve: {
            vehicleData: VehicleDataResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cvgsApp.vdsVehicleData.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vehicleDataPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: VehicleDataDeletePopupComponent,
        resolve: {
            vehicleData: VehicleDataResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cvgsApp.vdsVehicleData.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
