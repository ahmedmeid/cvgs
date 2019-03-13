/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CvgsTestModule } from '../../../../test.module';
import { VehicleDataUpdateComponent } from 'app/entities/vds/vehicle-data/vehicle-data-update.component';
import { VehicleDataService } from 'app/entities/vds/vehicle-data/vehicle-data.service';
import { VehicleData } from 'app/shared/model/vds/vehicle-data.model';

describe('Component Tests', () => {
    describe('VehicleData Management Update Component', () => {
        let comp: VehicleDataUpdateComponent;
        let fixture: ComponentFixture<VehicleDataUpdateComponent>;
        let service: VehicleDataService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CvgsTestModule],
                declarations: [VehicleDataUpdateComponent]
            })
                .overrideTemplate(VehicleDataUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VehicleDataUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleDataService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new VehicleData(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.vehicleData = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new VehicleData();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.vehicleData = entity;
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
