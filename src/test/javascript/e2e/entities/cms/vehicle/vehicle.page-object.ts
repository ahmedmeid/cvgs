import { element, by, ElementFinder } from 'protractor';

export class VehicleComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-vehicle div table .btn-danger'));
    title = element.all(by.css('jhi-vehicle div h2#page-heading span')).first();

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

export class VehicleUpdatePage {
    pageTitle = element(by.id('jhi-vehicle-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    vehicleIdInput = element(by.id('field_vehicleId'));
    vehicleRegNoInput = element(by.id('field_vehicleRegNo'));
    ownerSelect = element(by.id('field_owner'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setVehicleIdInput(vehicleId) {
        await this.vehicleIdInput.sendKeys(vehicleId);
    }

    async getVehicleIdInput() {
        return this.vehicleIdInput.getAttribute('value');
    }

    async setVehicleRegNoInput(vehicleRegNo) {
        await this.vehicleRegNoInput.sendKeys(vehicleRegNo);
    }

    async getVehicleRegNoInput() {
        return this.vehicleRegNoInput.getAttribute('value');
    }

    async ownerSelectLastOption() {
        await this.ownerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async ownerSelectOption(option) {
        await this.ownerSelect.sendKeys(option);
    }

    getOwnerSelect(): ElementFinder {
        return this.ownerSelect;
    }

    async getOwnerSelectedOption() {
        return this.ownerSelect.element(by.css('option:checked')).getText();
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

export class VehicleDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-vehicle-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-vehicle'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
