/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CvgsTestModule } from '../../../../test.module';
import { VehicleConnectionStatusComponent } from 'app/entities/vds/vehicle-connection-status/vehicle-connection-status.component';
import { VehicleConnectionStatusService } from 'app/entities/vds/vehicle-connection-status/vehicle-connection-status.service';
import { VehicleConnectionStatus } from 'app/shared/model/vds/vehicle-connection-status.model';

describe('Component Tests', () => {
    describe('VehicleConnectionStatus Management Component', () => {
        let comp: VehicleConnectionStatusComponent;
        let fixture: ComponentFixture<VehicleConnectionStatusComponent>;
        let service: VehicleConnectionStatusService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CvgsTestModule],
                declarations: [VehicleConnectionStatusComponent],
                providers: []
            })
                .overrideTemplate(VehicleConnectionStatusComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VehicleConnectionStatusComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleConnectionStatusService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new VehicleConnectionStatus(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.vehicleConnectionStatuses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
