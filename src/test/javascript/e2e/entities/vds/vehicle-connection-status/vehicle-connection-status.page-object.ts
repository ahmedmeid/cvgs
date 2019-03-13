import { element, by, ElementFinder } from 'protractor';

export class VehicleConnectionStatusComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-vehicle-connection-status div table .btn-danger'));
    title = element.all(by.css('jhi-vehicle-connection-status div h2#page-heading span')).first();

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

export class VehicleConnectionStatusUpdatePage {
    pageTitle = element(by.id('jhi-vehicle-connection-status-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    vehicleIdInput = element(by.id('field_vehicleId'));
    statusSelect = element(by.id('field_status'));
    lastUpdatedInput = element(by.id('field_lastUpdated'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setVehicleIdInput(vehicleId) {
        await this.vehicleIdInput.sendKeys(vehicleId);
    }

    async getVehicleIdInput() {
        return this.vehicleIdInput.getAttribute('value');
    }

    async setStatusSelect(status) {
        await this.statusSelect.sendKeys(status);
    }

    async getStatusSelect() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    }

    async statusSelectLastOption() {
        await this.statusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setLastUpdatedInput(lastUpdated) {
        await this.lastUpdatedInput.sendKeys(lastUpdated);
    }

    async getLastUpdatedInput() {
        return this.lastUpdatedInput.getAttribute('value');
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

export class VehicleConnectionStatusDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-vehicleConnectionStatus-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-vehicleConnectionStatus'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
