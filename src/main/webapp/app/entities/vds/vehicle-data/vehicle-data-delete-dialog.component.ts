import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVehicleData } from 'app/shared/model/vds/vehicle-data.model';
import { VehicleDataService } from './vehicle-data.service';

@Component({
    selector: 'jhi-vehicle-data-delete-dialog',
    templateUrl: './vehicle-data-delete-dialog.component.html'
})
export class VehicleDataDeleteDialogComponent {
    vehicleData: IVehicleData;

    constructor(
        protected vehicleDataService: VehicleDataService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vehicleDataService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'vehicleDataListModification',
                content: 'Deleted an vehicleData'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vehicle-data-delete-popup',
    template: ''
})
export class VehicleDataDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vehicleData }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VehicleDataDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.vehicleData = vehicleData;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/vehicle-data', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/vehicle-data', { outlets: { popup: null } }]);
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
