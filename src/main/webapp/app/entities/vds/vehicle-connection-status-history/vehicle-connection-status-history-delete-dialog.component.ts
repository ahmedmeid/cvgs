import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVehicleConnectionStatusHistory } from 'app/shared/model/vds/vehicle-connection-status-history.model';
import { VehicleConnectionStatusHistoryService } from './vehicle-connection-status-history.service';

@Component({
    selector: 'jhi-vehicle-connection-status-history-delete-dialog',
    templateUrl: './vehicle-connection-status-history-delete-dialog.component.html'
})
export class VehicleConnectionStatusHistoryDeleteDialogComponent {
    vehicleConnectionStatusHistory: IVehicleConnectionStatusHistory;

    constructor(
        protected vehicleConnectionStatusHistoryService: VehicleConnectionStatusHistoryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vehicleConnectionStatusHistoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'vehicleConnectionStatusHistoryListModification',
                content: 'Deleted an vehicleConnectionStatusHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vehicle-connection-status-history-delete-popup',
    template: ''
})
export class VehicleConnectionStatusHistoryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vehicleConnectionStatusHistory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VehicleConnectionStatusHistoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.vehicleConnectionStatusHistory = vehicleConnectionStatusHistory;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/vehicle-connection-status-history', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/vehicle-connection-status-history', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
