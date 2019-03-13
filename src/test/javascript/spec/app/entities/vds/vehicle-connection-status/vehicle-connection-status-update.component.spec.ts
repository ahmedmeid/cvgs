/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CvgsTestModule } from '../../../../test.module';
import { VehicleConnectionStatusUpdateComponent } from 'app/entities/vds/vehicle-connection-status/vehicle-connection-status-update.component';
import { VehicleConnectionStatusService } from 'app/entities/vds/vehicle-connection-status/vehicle-connection-status.service';
import { VehicleConnectionStatus } from 'app/shared/model/vds/vehicle-connection-status.model';

describe('Component Tests', () => {
    describe('VehicleConnectionStatus Management Update Component', () => {
        let comp: VehicleConnectionStatusUpdateComponent;
        let fixture: ComponentFixture<VehicleConnectionStatusUpdateComponent>;
        let service: VehicleConnectionStatusService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CvgsTestModule],
                declarations: [VehicleConnectionStatusUpdateComponent]
            })
                .overrideTemplate(VehicleConnectionStatusUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VehicleConnectionStatusUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleConnectionStatusService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new VehicleConnectionStatus(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.vehicleConnectionStatus = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new VehicleConnectionStatus();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.vehicleConnectionStatus = entity;
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
