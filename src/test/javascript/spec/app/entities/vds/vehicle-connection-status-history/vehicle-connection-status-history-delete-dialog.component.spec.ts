/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CvgsTestModule } from '../../../../test.module';
import { VehicleConnectionStatusHistoryDeleteDialogComponent } from 'app/entities/vds/vehicle-connection-status-history/vehicle-connection-status-history-delete-dialog.component';
import { VehicleConnectionStatusHistoryService } from 'app/entities/vds/vehicle-connection-status-history/vehicle-connection-status-history.service';

describe('Component Tests', () => {
    describe('VehicleConnectionStatusHistory Management Delete Component', () => {
        let comp: VehicleConnectionStatusHistoryDeleteDialogComponent;
        let fixture: ComponentFixture<VehicleConnectionStatusHistoryDeleteDialogComponent>;
        let service: VehicleConnectionStatusHistoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CvgsTestModule],
                declarations: [VehicleConnectionStatusHistoryDeleteDialogComponent]
            })
                .overrideTemplate(VehicleConnectionStatusHistoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VehicleConnectionStatusHistoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleConnectionStatusHistoryService);
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
