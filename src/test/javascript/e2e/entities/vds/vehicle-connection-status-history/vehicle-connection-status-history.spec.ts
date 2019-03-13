/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
    VehicleConnectionStatusHistoryComponentsPage,
    VehicleConnectionStatusHistoryDeleteDialog,
    VehicleConnectionStatusHistoryUpdatePage
} from './vehicle-connection-status-history.page-object';

const expect = chai.expect;

describe('VehicleConnectionStatusHistory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let vehicleConnectionStatusHistoryUpdatePage: VehicleConnectionStatusHistoryUpdatePage;
    let vehicleConnectionStatusHistoryComponentsPage: VehicleConnectionStatusHistoryComponentsPage;
    let vehicleConnectionStatusHistoryDeleteDialog: VehicleConnectionStatusHistoryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load VehicleConnectionStatusHistories', async () => {
        await navBarPage.goToEntity('vehicle-connection-status-history');
        vehicleConnectionStatusHistoryComponentsPage = new VehicleConnectionStatusHistoryComponentsPage();
        await browser.wait(ec.visibilityOf(vehicleConnectionStatusHistoryComponentsPage.title), 5000);
        expect(await vehicleConnectionStatusHistoryComponentsPage.getTitle()).to.eq('cvgsApp.vdsVehicleConnectionStatusHistory.home.title');
    });

    it('should load create VehicleConnectionStatusHistory page', async () => {
        await vehicleConnectionStatusHistoryComponentsPage.clickOnCreateButton();
        vehicleConnectionStatusHistoryUpdatePage = new VehicleConnectionStatusHistoryUpdatePage();
        expect(await vehicleConnectionStatusHistoryUpdatePage.getPageTitle()).to.eq(
            'cvgsApp.vdsVehicleConnectionStatusHistory.home.createOrEditLabel'
        );
        await vehicleConnectionStatusHistoryUpdatePage.cancel();
    });

    it('should create and save VehicleConnectionStatusHistories', async () => {
        const nbButtonsBeforeCreate = await vehicleConnectionStatusHistoryComponentsPage.countDeleteButtons();

        await vehicleConnectionStatusHistoryComponentsPage.clickOnCreateButton();
        await promise.all([
            vehicleConnectionStatusHistoryUpdatePage.setVehicleIdInput('vehicleId'),
            vehicleConnectionStatusHistoryUpdatePage.setStatusInput('status'),
            vehicleConnectionStatusHistoryUpdatePage.setStatusAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
        ]);
        expect(await vehicleConnectionStatusHistoryUpdatePage.getVehicleIdInput()).to.eq('vehicleId');
        expect(await vehicleConnectionStatusHistoryUpdatePage.getStatusInput()).to.eq('status');
        expect(await vehicleConnectionStatusHistoryUpdatePage.getStatusAtInput()).to.contain('2001-01-01T02:30');
        await vehicleConnectionStatusHistoryUpdatePage.save();
        expect(await vehicleConnectionStatusHistoryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await vehicleConnectionStatusHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last VehicleConnectionStatusHistory', async () => {
        const nbButtonsBeforeDelete = await vehicleConnectionStatusHistoryComponentsPage.countDeleteButtons();
        await vehicleConnectionStatusHistoryComponentsPage.clickOnLastDeleteButton();

        vehicleConnectionStatusHistoryDeleteDialog = new VehicleConnectionStatusHistoryDeleteDialog();
        expect(await vehicleConnectionStatusHistoryDeleteDialog.getDialogTitle()).to.eq(
            'cvgsApp.vdsVehicleConnectionStatusHistory.delete.question'
        );
        await vehicleConnectionStatusHistoryDeleteDialog.clickOnConfirmButton();

        expect(await vehicleConnectionStatusHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
