/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CvgsTestModule } from '../../../../test.module';
import { VehicleDataDeleteDialogComponent } from 'app/entities/vds/vehicle-data/vehicle-data-delete-dialog.component';
import { VehicleDataService } from 'app/entities/vds/vehicle-data/vehicle-data.service';

describe('Component Tests', () => {
    describe('VehicleData Management Delete Component', () => {
        let comp: VehicleDataDeleteDialogComponent;
        let fixture: ComponentFixture<VehicleDataDeleteDialogComponent>;
        let service: VehicleDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CvgsTestModule],
                declarations: [VehicleDataDeleteDialogComponent]
            })
                .overrideTemplate(VehicleDataDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VehicleDataDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleDataService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
