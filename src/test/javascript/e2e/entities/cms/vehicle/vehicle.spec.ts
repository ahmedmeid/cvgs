/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { VehicleComponentsPage, VehicleDeleteDialog, VehicleUpdatePage } from './vehicle.page-object';

const expect = chai.expect;

describe('Vehicle e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let vehicleUpdatePage: VehicleUpdatePage;
    let vehicleComponentsPage: VehicleComponentsPage;
    /*let vehicleDeleteDialog: VehicleDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Vehicles', async () => {
        await navBarPage.goToEntity('vehicle');
        vehicleComponentsPage = new VehicleComponentsPage();
        await browser.wait(ec.visibilityOf(vehicleComponentsPage.title), 5000);
        expect(await vehicleComponentsPage.getTitle()).to.eq('cvgsApp.cmsVehicle.home.title');
    });

    it('should load create Vehicle page', async () => {
        await vehicleComponentsPage.clickOnCreateButton();
        vehicleUpdatePage = new VehicleUpdatePage();
        expect(await vehicleUpdatePage.getPageTitle()).to.eq('cvgsApp.cmsVehicle.home.createOrEditLabel');
        await vehicleUpdatePage.cancel();
    });

    /* it('should create and save Vehicles', async () => {
        const nbButtonsBeforeCreate = await vehicleComponentsPage.countDeleteButtons();

        await vehicleComponentsPage.clickOnCreateButton();
        await promise.all([
            vehicleUpdatePage.setVehicleIdInput('vehicleId'),
            vehicleUpdatePage.setVehicleRegNoInput('vehicleRegNo'),
            vehicleUpdatePage.ownerSelectLastOption(),
        ]);
        expect(await vehicleUpdatePage.getVehicleIdInput()).to.eq('vehicleId');
        expect(await vehicleUpdatePage.getVehicleRegNoInput()).to.eq('vehicleRegNo');
        await vehicleUpdatePage.save();
        expect(await vehicleUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await vehicleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last Vehicle', async () => {
        const nbButtonsBeforeDelete = await vehicleComponentsPage.countDeleteButtons();
        await vehicleComponentsPage.clickOnLastDeleteButton();

        vehicleDeleteDialog = new VehicleDeleteDialog();
        expect(await vehicleDeleteDialog.getDialogTitle())
            .to.eq('cvgsApp.cmsVehicle.delete.question');
        await vehicleDeleteDialog.clickOnConfirmButton();

        expect(await vehicleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
