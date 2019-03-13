/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
    VehicleConnectionStatusComponentsPage,
    VehicleConnectionStatusDeleteDialog,
    VehicleConnectionStatusUpdatePage
} from './vehicle-connection-status.page-object';

const expect = chai.expect;

describe('VehicleConnectionStatus e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let vehicleConnectionStatusUpdatePage: VehicleConnectionStatusUpdatePage;
    let vehicleConnectionStatusComponentsPage: VehicleConnectionStatusComponentsPage;
    let vehicleConnectionStatusDeleteDialog: VehicleConnectionStatusDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load VehicleConnectionStatuses', async () => {
        await navBarPage.goToEntity('vehicle-connection-status');
        vehicleConnectionStatusComponentsPage = new VehicleConnectionStatusComponentsPage();
        await browser.wait(ec.visibilityOf(vehicleConnectionStatusComponentsPage.title), 5000);
        expect(await vehicleConnectionStatusComponentsPage.getTitle()).to.eq('cvgsApp.vdsVehicleConnectionStatus.home.title');
    });

    it('should load create VehicleConnectionStatus page', async () => {
        await vehicleConnectionStatusComponentsPage.clickOnCreateButton();
        vehicleConnectionStatusUpdatePage = new VehicleConnectionStatusUpdatePage();
        expect(await vehicleConnectionStatusUpdatePage.getPageTitle()).to.eq('cvgsApp.vdsVehicleConnectionStatus.home.createOrEditLabel');
        await vehicleConnectionStatusUpdatePage.cancel();
    });

    it('should create and save VehicleConnectionStatuses', async () => {
        const nbButtonsBeforeCreate = await vehicleConnectionStatusComponentsPage.countDeleteButtons();

        await vehicleConnectionStatusComponentsPage.clickOnCreateButton();
        await promise.all([
            vehicleConnectionStatusUpdatePage.setVehicleIdInput('vehicleId'),
            vehicleConnectionStatusUpdatePage.statusSelectLastOption(),
            vehicleConnectionStatusUpdatePage.setLastUpdatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
        ]);
        expect(await vehicleConnectionStatusUpdatePage.getVehicleIdInput()).to.eq('vehicleId');
        expect(await vehicleConnectionStatusUpdatePage.getLastUpdatedInput()).to.contain('2001-01-01T02:30');
        await vehicleConnectionStatusUpdatePage.save();
        expect(await vehicleConnectionStatusUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await vehicleConnectionStatusComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last VehicleConnectionStatus', async () => {
        const nbButtonsBeforeDelete = await vehicleConnectionStatusComponentsPage.countDeleteButtons();
        await vehicleConnectionStatusComponentsPage.clickOnLastDeleteButton();

        vehicleConnectionStatusDeleteDialog = new VehicleConnectionStatusDeleteDialog();
        expect(await vehicleConnectionStatusDeleteDialog.getDialogTitle()).to.eq('cvgsApp.vdsVehicleConnectionStatus.delete.question');
        await vehicleConnectionStatusDeleteDialog.clickOnConfirmButton();

        expect(await vehicleConnectionStatusComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
