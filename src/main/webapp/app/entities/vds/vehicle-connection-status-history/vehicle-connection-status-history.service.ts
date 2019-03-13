import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVehicleConnectionStatusHistory } from 'app/shared/model/vds/vehicle-connection-status-history.model';

type EntityResponseType = HttpResponse<IVehicleConnectionStatusHistory>;
type EntityArrayResponseType = HttpResponse<IVehicleConnectionStatusHistory[]>;

@Injectable({ providedIn: 'root' })
export class VehicleConnectionStatusHistoryService {
    public resourceUrl = SERVER_API_URL + 'vds/api/vehicle-connection-status-histories';

    constructor(protected http: HttpClient) {}

    create(vehicleConnectionStatusHistory: IVehicleConnectionStatusHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(vehicleConnectionStatusHistory);
        return this.http
            .post<IVehicleConnectionStatusHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(vehicleConnectionStatusHistory: IVehicleConnectionStatusHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(vehicleConnectionStatusHistory);
        return this.http
            .put<IVehicleConnectionStatusHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IVehicleConnectionStatusHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IVehicleConnectionStatusHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(vehicleConnectionStatusHistory: IVehicleConnectionStatusHistory): IVehicleConnectionStatusHistory {
        const copy: IVehicleConnectionStatusHistory = Object.assign({}, vehicleConnectionStatusHistory, {
            statusAt:
                vehicleConnectionStatusHistory.statusAt != null && vehicleConnectionStatusHistory.statusAt.isValid()
                    ? vehicleConnectionStatusHistory.statusAt.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.statusAt = res.body.statusAt != null ? moment(res.body.statusAt) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((vehicleConnectionStatusHistory: IVehicleConnectionStatusHistory) => {
                vehicleConnectionStatusHistory.statusAt =
                    vehicleConnectionStatusHistory.statusAt != null ? moment(vehicleConnectionStatusHistory.statusAt) : null;
            });
        }
        return res;
    }
}
