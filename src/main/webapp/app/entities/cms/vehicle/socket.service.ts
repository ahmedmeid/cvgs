import { Injectable } from '@angular/core';

import * as SockJS from 'sockjs-client';

import { SERVER_API_URL } from 'app/app.constants';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    public initSocket(): SockJS {
        // prod
        return new SockJS(SERVER_API_URL + '/socket');
        // dev
        // return new SockJS('http://localhost:8080/socket');
    }
}
