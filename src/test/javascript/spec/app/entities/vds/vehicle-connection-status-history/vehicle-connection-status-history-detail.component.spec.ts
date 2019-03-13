/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CvgsTestModule } from '../../../../test.module';
import { VehicleConnectionStatusHistoryDetailComponent } from 'app/entities/vds/vehicle-connection-status-history/vehicle-connection-status-history-detail.component';
import { VehicleConnectionStatusHistory } from 'app/shared/model/vds/vehicle-connection-status-history.model';

describe('Component Tests', () => {
    describe('VehicleConnectionStatusHistory Management Detail Component', () => {
        let comp: VehicleConnectionStatusHistoryDetailComponent;
        let fixture: ComponentFixture<VehicleConnectionStatusHistoryDetailComponent>;
        const route = ({ data: of({ vehicleConnectionStatusHistory: new VehicleConnectionStatusHistory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CvgsTestModule],
                declarations: [VehicleConnectionStatusHistoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VehicleConnectionStatusHistoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VehicleConnectionStatusHistoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.vehicleConnectionStatusHistory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
