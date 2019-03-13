import { element, by, ElementFinder } from 'protractor';

export class VehicleConnectionStatusHistoryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-vehicle-connection-status-history div table .btn-danger'));
    title = element.all(by.css('jhi-vehicle-connection-status-history div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class VehicleConnectionStatusHistoryUpdatePage {
    pageTitle = element(by.id('jhi-vehicle-connection-status-history-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    vehicleIdInput = element(by.id('field_vehicleId'));
    statusInput = element(by.id('field_status'));
    statusAtInput = element(by.id('field_statusAt'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setVehicleIdInput(vehicleId) {
        await this.vehicleIdInput.sendKeys(vehicleId);
    }

    async getVehicleIdInput() {
        return this.vehicleIdInput.getAttribute('value');
    }

    async setStatusInput(status) {
        await this.statusInput.sendKeys(status);
    }

    async getStatusInput() {
        return this.statusInput.getAttribute('value');
    }

    async setStatusAtInput(statusAt) {
        await this.statusAtInput.sendKeys(statusAt);
    }

    async getStatusAtInput() {
        return this.statusAtInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class VehicleConnectionStatusHistoryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-vehicleConnectionStatusHistory-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-vehicleConnectionStatusHistory'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
