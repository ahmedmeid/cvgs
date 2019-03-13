/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CvgsTestModule } from '../../../../test.module';
import { VehicleConnectionStatusHistoryComponent } from 'app/entities/vds/vehicle-connection-status-history/vehicle-connection-status-history.component';
import { VehicleConnectionStatusHistoryService } from 'app/entities/vds/vehicle-connection-status-history/vehicle-connection-status-history.service';
import { VehicleConnectionStatusHistory } from 'app/shared/model/vds/vehicle-connection-status-history.model';

describe('Component Tests', () => {
    describe('VehicleConnectionStatusHistory Management Component', () => {
        let comp: VehicleConnectionStatusHistoryComponent;
        let fixture: ComponentFixture<VehicleConnectionStatusHistoryComponent>;
        let service: VehicleConnectionStatusHistoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CvgsTestModule],
                declarations: [VehicleConnectionStatusHistoryComponent],
                providers: []
            })
                .overrideTemplate(VehicleConnectionStatusHistoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VehicleConnectionStatusHistoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleConnectionStatusHistoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new VehicleConnectionStatusHistory(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.vehicleConnectionStatusHistories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
