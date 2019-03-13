/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CvgsTestModule } from '../../../../test.module';
import { VehicleConnectionStatusDeleteDialogComponent } from 'app/entities/vds/vehicle-connection-status/vehicle-connection-status-delete-dialog.component';
import { VehicleConnectionStatusService } from 'app/entities/vds/vehicle-connection-status/vehicle-connection-status.service';

describe('Component Tests', () => {
    describe('VehicleConnectionStatus Management Delete Component', () => {
        let comp: VehicleConnectionStatusDeleteDialogComponent;
        let fixture: ComponentFixture<VehicleConnectionStatusDeleteDialogComponent>;
        let service: VehicleConnectionStatusService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CvgsTestModule],
                declarations: [VehicleConnectionStatusDeleteDialogComponent]
            })
                .overrideTemplate(VehicleConnectionStatusDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VehicleConnectionStatusDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleConnectionStatusService);
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
