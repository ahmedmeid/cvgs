import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVehicleData } from 'app/shared/model/vds/vehicle-data.model';

type EntityResponseType = HttpResponse<IVehicleData>;
type EntityArrayResponseType = HttpResponse<IVehicleData[]>;

@Injectable({ providedIn: 'root' })
export class VehicleDataService {
    public resourceUrl = SERVER_API_URL + 'vds/api/vehicle-data';

    constructor(protected http: HttpClient) {}

    create(vehicleData: IVehicleData): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(vehicleData);
        return this.http
            .post<IVehicleData>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(vehicleData: IVehicleData): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(vehicleData);
        return this.http
            .put<IVehicleData>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IVehicleData>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IVehicleData[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(vehicleData: IVehicleData): IVehicleData {
        const copy: IVehicleData = Object.assign({}, vehicleData, {
            timeStamp: vehicleData.timeStamp != null && vehicleData.timeStamp.isValid() ? vehicleData.timeStamp.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.timeStamp = res.body.timeStamp != null ? moment(res.body.timeStamp) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((vehicleData: IVehicleData) => {
                vehicleData.timeStamp = vehicleData.timeStamp != null ? moment(vehicleData.timeStamp) : null;
            });
        }
        return res;
    }
}
