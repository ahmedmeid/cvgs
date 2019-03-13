import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CvgsSharedModule } from 'app/shared';
import {
    VehicleConnectionStatusComponent,
    VehicleConnectionStatusDetailComponent,
    VehicleConnectionStatusUpdateComponent,
    VehicleConnectionStatusDeletePopupComponent,
    VehicleConnectionStatusDeleteDialogComponent,
    vehicleConnectionStatusRoute,
    vehicleConnectionStatusPopupRoute
} from './';

const ENTITY_STATES = [...vehicleConnectionStatusRoute, ...vehicleConnectionStatusPopupRoute];

@NgModule({
    imports: [CvgsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VehicleConnectionStatusComponent,
        VehicleConnectionStatusDetailComponent,
        VehicleConnectionStatusUpdateComponent,
        VehicleConnectionStatusDeleteDialogComponent,
        VehicleConnectionStatusDeletePopupComponent
    ],
    entryComponents: [
        VehicleConnectionStatusComponent,
        VehicleConnectionStatusUpdateComponent,
        VehicleConnectionStatusDeleteDialogComponent,
        VehicleConnectionStatusDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VdsVehicleConnectionStatusModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
