/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CvgsTestModule } from '../../../../test.module';
import { VehicleConnectionStatusDetailComponent } from 'app/entities/vds/vehicle-connection-status/vehicle-connection-status-detail.component';
import { VehicleConnectionStatus } from 'app/shared/model/vds/vehicle-connection-status.model';

describe('Component Tests', () => {
    describe('VehicleConnectionStatus Management Detail Component', () => {
        let comp: VehicleConnectionStatusDetailComponent;
        let fixture: ComponentFixture<VehicleConnectionStatusDetailComponent>;
        const route = ({ data: of({ vehicleConnectionStatus: new VehicleConnectionStatus(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CvgsTestModule],
                declarations: [VehicleConnectionStatusDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VehicleConnectionStatusDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VehicleConnectionStatusDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.vehicleConnectionStatus).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
