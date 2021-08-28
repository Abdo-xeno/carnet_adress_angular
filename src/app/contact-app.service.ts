import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ContactApp } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactAppService {

  constructor(private httpClient: HttpClient) { }

  getContacts(): Observable<ContactApp[]>{
    return this.httpClient.get<ContactApp[]>('api/contacts');
  }
  AddContact(contactApp: ContactApp){
    return this.httpClient.post<ContactApp[]>('api/contacts',contactApp)
  }
  UpdateContact(contactApp: ContactApp){
    return this.httpClient.put<ContactApp[]>(`api/contacts/`,contactApp);
  }

  DeleteContact(contactId: number):Observable<any>{
    return this.httpClient.delete(`api/contacts/${contactId}`);
  }

  getContactById(contactId: number): Observable<ContactApp>{
    return this.httpClient.get<ContactApp>(`api/contacts/${contactId}`)
  }
}
