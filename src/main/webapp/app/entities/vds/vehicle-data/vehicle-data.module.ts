import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CvgsSharedModule } from 'app/shared';
import {
    VehicleDataComponent,
    VehicleDataDetailComponent,
    VehicleDataUpdateComponent,
    VehicleDataDeletePopupComponent,
    VehicleDataDeleteDialogComponent,
    vehicleDataRoute,
    vehicleDataPopupRoute
} from './';

const ENTITY_STATES = [...vehicleDataRoute, ...vehicleDataPopupRoute];

@NgModule({
    imports: [CvgsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VehicleDataComponent,
        VehicleDataDetailComponent,
        VehicleDataUpdateComponent,
        VehicleDataDeleteDialogComponent,
        VehicleDataDeletePopupComponent
    ],
    entryComponents: [VehicleDataComponent, VehicleDataUpdateComponent, VehicleDataDeleteDialogComponent, VehicleDataDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VdsVehicleDataModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
