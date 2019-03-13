/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { VehicleDataComponentsPage, VehicleDataDeleteDialog, VehicleDataUpdatePage } from './vehicle-data.page-object';

const expect = chai.expect;

describe('VehicleData e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let vehicleDataUpdatePage: VehicleDataUpdatePage;
    let vehicleDataComponentsPage: VehicleDataComponentsPage;
    let vehicleDataDeleteDialog: VehicleDataDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load VehicleData', async () => {
        await navBarPage.goToEntity('vehicle-data');
        vehicleDataComponentsPage = new VehicleDataComponentsPage();
        await browser.wait(ec.visibilityOf(vehicleDataComponentsPage.title), 5000);
        expect(await vehicleDataComponentsPage.getTitle()).to.eq('cvgsApp.vdsVehicleData.home.title');
    });

    it('should load create VehicleData page', async () => {
        await vehicleDataComponentsPage.clickOnCreateButton();
        vehicleDataUpdatePage = new VehicleDataUpdatePage();
        expect(await vehicleDataUpdatePage.getPageTitle()).to.eq('cvgsApp.vdsVehicleData.home.createOrEditLabel');
        await vehicleDataUpdatePage.cancel();
    });

    it('should create and save VehicleData', async () => {
        const nbButtonsBeforeCreate = await vehicleDataComponentsPage.countDeleteButtons();

        await vehicleDataComponentsPage.clickOnCreateButton();
        await promise.all([
            vehicleDataUpdatePage.setVehicleIdInput('vehicleId'),
            vehicleDataUpdatePage.setLongitudeInput('longitude'),
            vehicleDataUpdatePage.setLatitudeInput('latitude'),
            vehicleDataUpdatePage.setSpeedInput('5'),
            vehicleDataUpdatePage.setFuelLevelInput('5'),
            vehicleDataUpdatePage.setTimeStampInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
        ]);
        expect(await vehicleDataUpdatePage.getVehicleIdInput()).to.eq('vehicleId');
        expect(await vehicleDataUpdatePage.getLongitudeInput()).to.eq('longitude');
        expect(await vehicleDataUpdatePage.getLatitudeInput()).to.eq('latitude');
        expect(await vehicleDataUpdatePage.getSpeedInput()).to.eq('5');
        expect(await vehicleDataUpdatePage.getFuelLevelInput()).to.eq('5');
        expect(await vehicleDataUpdatePage.getTimeStampInput()).to.contain('2001-01-01T02:30');
        await vehicleDataUpdatePage.save();
        expect(await vehicleDataUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await vehicleDataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last VehicleData', async () => {
        const nbButtonsBeforeDelete = await vehicleDataComponentsPage.countDeleteButtons();
        await vehicleDataComponentsPage.clickOnLastDeleteButton();

        vehicleDataDeleteDialog = new VehicleDataDeleteDialog();
        expect(await vehicleDataDeleteDialog.getDialogTitle()).to.eq('cvgsApp.vdsVehicleData.delete.question');
        await vehicleDataDeleteDialog.clickOnConfirmButton();

        expect(await vehicleDataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
