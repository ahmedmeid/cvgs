import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVehicleConnectionStatus } from 'app/shared/model/vds/vehicle-connection-status.model';

type EntityResponseType = HttpResponse<IVehicleConnectionStatus>;
type EntityArrayResponseType = HttpResponse<IVehicleConnectionStatus[]>;

@Injectable({ providedIn: 'root' })
export class VehicleConnectionStatusService {
    public resourceUrl = SERVER_API_URL + 'vds/api/vehicle-connection-statuses';

    constructor(protected http: HttpClient) {}

    create(vehicleConnectionStatus: IVehicleConnectionStatus): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(vehicleConnectionStatus);
        return this.http
            .post<IVehicleConnectionStatus>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(vehicleConnectionStatus: IVehicleConnectionStatus): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(vehicleConnectionStatus);
        return this.http
            .put<IVehicleConnectionStatus>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IVehicleConnectionStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IVehicleConnectionStatus[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(vehicleConnectionStatus: IVehicleConnectionStatus): IVehicleConnectionStatus {
        const copy: IVehicleConnectionStatus = Object.assign({}, vehicleConnectionStatus, {
            lastUpdated:
                vehicleConnectionStatus.lastUpdated != null && vehicleConnectionStatus.lastUpdated.isValid()
                    ? vehicleConnectionStatus.lastUpdated.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.lastUpdated = res.body.lastUpdated != null ? moment(res.body.lastUpdated) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((vehicleConnectionStatus: IVehicleConnectionStatus) => {
                vehicleConnectionStatus.lastUpdated =
                    vehicleConnectionStatus.lastUpdated != null ? moment(vehicleConnectionStatus.lastUpdated) : null;
            });
        }
        return res;
    }
}
