/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CvgsTestModule } from '../../../../test.module';
import { VehicleConnectionStatusHistoryUpdateComponent } from 'app/entities/vds/vehicle-connection-status-history/vehicle-connection-status-history-update.component';
import { VehicleConnectionStatusHistoryService } from 'app/entities/vds/vehicle-connection-status-history/vehicle-connection-status-history.service';
import { VehicleConnectionStatusHistory } from 'app/shared/model/vds/vehicle-connection-status-history.model';

describe('Component Tests', () => {
    describe('VehicleConnectionStatusHistory Management Update Component', () => {
        let comp: VehicleConnectionStatusHistoryUpdateComponent;
        let fixture: ComponentFixture<VehicleConnectionStatusHistoryUpdateComponent>;
        let service: VehicleConnectionStatusHistoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CvgsTestModule],
                declarations: [VehicleConnectionStatusHistoryUpdateComponent]
            })
                .overrideTemplate(VehicleConnectionStatusHistoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VehicleConnectionStatusHistoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleConnectionStatusHistoryService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new VehicleConnectionStatusHistory(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.vehicleConnectionStatusHistory = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new VehicleConnectionStatusHistory();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.vehicleConnectionStatusHistory = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
