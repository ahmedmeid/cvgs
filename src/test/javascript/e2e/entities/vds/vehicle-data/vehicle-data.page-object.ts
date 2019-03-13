import { element, by, ElementFinder } from 'protractor';

export class VehicleDataComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-vehicle-data div table .btn-danger'));
    title = element.all(by.css('jhi-vehicle-data div h2#page-heading span')).first();

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

export class VehicleDataUpdatePage {
    pageTitle = element(by.id('jhi-vehicle-data-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    vehicleIdInput = element(by.id('field_vehicleId'));
    longitudeInput = element(by.id('field_longitude'));
    latitudeInput = element(by.id('field_latitude'));
    speedInput = element(by.id('field_speed'));
    fuelLevelInput = element(by.id('field_fuelLevel'));
    timeStampInput = element(by.id('field_timeStamp'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setVehicleIdInput(vehicleId) {
        await this.vehicleIdInput.sendKeys(vehicleId);
    }

    async getVehicleIdInput() {
        return this.vehicleIdInput.getAttribute('value');
    }

    async setLongitudeInput(longitude) {
        await this.longitudeInput.sendKeys(longitude);
    }

    async getLongitudeInput() {
        return this.longitudeInput.getAttribute('value');
    }

    async setLatitudeInput(latitude) {
        await this.latitudeInput.sendKeys(latitude);
    }

    async getLatitudeInput() {
        return this.latitudeInput.getAttribute('value');
    }

    async setSpeedInput(speed) {
        await this.speedInput.sendKeys(speed);
    }

    async getSpeedInput() {
        return this.speedInput.getAttribute('value');
    }

    async setFuelLevelInput(fuelLevel) {
        await this.fuelLevelInput.sendKeys(fuelLevel);
    }

    async getFuelLevelInput() {
        return this.fuelLevelInput.getAttribute('value');
    }

    async setTimeStampInput(timeStamp) {
        await this.timeStampInput.sendKeys(timeStamp);
    }

    async getTimeStampInput() {
        return this.timeStampInput.getAttribute('value');
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

export class VehicleDataDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-vehicleData-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-vehicleData'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
