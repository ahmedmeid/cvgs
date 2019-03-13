import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVehicleConnectionStatus } from 'app/shared/model/vds/vehicle-connection-status.model';
import { VehicleConnectionStatusService } from './vehicle-connection-status.service';

@Component({
    selector: 'jhi-vehicle-connection-status-delete-dialog',
    templateUrl: './vehicle-connection-status-delete-dialog.component.html'
})
export class VehicleConnectionStatusDeleteDialogComponent {
    vehicleConnectionStatus: IVehicleConnectionStatus;

    constructor(
        protected vehicleConnectionStatusService: VehicleConnectionStatusService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vehicleConnectionStatusService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'vehicleConnectionStatusListModification',
                content: 'Deleted an vehicleConnectionStatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vehicle-connection-status-delete-popup',
    template: ''
})
export class VehicleConnectionStatusDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vehicleConnectionStatus }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VehicleConnectionStatusDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.vehicleConnectionStatus = vehicleConnectionStatus;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/vehicle-connection-status', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/vehicle-connection-status', { outlets: { popup: null } }]);
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
