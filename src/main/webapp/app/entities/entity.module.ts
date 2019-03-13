import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'customer',
                loadChildren: './cms/customer/customer.module#CmsCustomerModule'
            },
            {
                path: 'vehicle',
                loadChildren: './cms/vehicle/vehicle.module#CmsVehicleModule'
            },
            {
                path: 'vehicle-connection-status',
                loadChildren: './vds/vehicle-connection-status/vehicle-connection-status.module#VdsVehicleConnectionStatusModule'
            },
            {
                path: 'vehicle-connection-status-history',
                loadChildren:
                    './vds/vehicle-connection-status-history/vehicle-connection-status-history.module#VdsVehicleConnectionStatusHistoryModule'
            },
            {
                path: 'vehicle-data',
                loadChildren: './vds/vehicle-data/vehicle-data.module#VdsVehicleDataModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CvgsEntityModule {}
