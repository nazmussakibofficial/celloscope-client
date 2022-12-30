import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserData {
    constructor(private http: HttpClient) { }

    private url: string = "https://celloscope-server.vercel.app/users";

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url);
    }
}