/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CvgsTestModule } from '../../../../test.module';
import { VehicleDataDetailComponent } from 'app/entities/vds/vehicle-data/vehicle-data-detail.component';
import { VehicleData } from 'app/shared/model/vds/vehicle-data.model';

describe('Component Tests', () => {
    describe('VehicleData Management Detail Component', () => {
        let comp: VehicleDataDetailComponent;
        let fixture: ComponentFixture<VehicleDataDetailComponent>;
        const route = ({ data: of({ vehicleData: new VehicleData(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CvgsTestModule],
                declarations: [VehicleDataDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VehicleDataDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VehicleDataDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.vehicleData).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
