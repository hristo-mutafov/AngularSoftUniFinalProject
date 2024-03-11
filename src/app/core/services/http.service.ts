import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(private http: HttpClient) {}

    register(email: string, password: string) {
        return this.http.post('/api/register', { email, password });
    }

    login(email: string, password: string) {
        return this.http.post('/api/login', { email, password });
    }
}
