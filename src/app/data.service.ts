//src/app/data.services.ts

import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  /*private contactsSource = new BehaviorSubject<{firstName: string}[]>([]);
  contacts = this.contactsSource.asObservable();*/

  /*changeUsers(contacts: {firstName: string}[]) {
    this.contactsSource.next(contacts);
  }*/


  constructor() {
    //this.contactsSource.next([])
   }

   

  createDb() {
    return {
      contacts: [
        {
          
          firstName: 'Seaman Cap',
          lastName: 'Lorem ipsum . Voluptatem excepturi magnam nostrum dolore recusandae',
          id: 1,
          birthDay:'12/01/2005',
          addresses:'Adresse principale: paris,boulevard de la etc..,Adresse secondaire 2 : hahahahaXDDD'
        },
        {
          
          firstName: 'T-shirt',
          lastName: 'Adresse principale: amet consectetur adipisicing elit.Lorem ipsum dolor sit ',
          id: 2,
          birthDay:'05/01/1985',
          addresses:'casablanca,965,boulevard,etc'
        },
        {
        
          firstName: 'Back Pack',
          lastName: 'Voluptatem excepturi harum rerum aliquam magnam nostrum dolore recusandae',
          id: 3,
          birthDay:'17/03/1996',
          addresses:[{type: 'principale',  street:'rgfdgfds'}, {type:'travail'}]
        }
      ]
    };
  }

}

  export class ContactApp{
    id?: number
    firstName: string
    lastName: string
    birthDay: string
    addresses:any


    constructor(id:number,firstName:string,lastName:string,birthDay:string, addresses:{}[]){
      this.id=id;
      this.firstName=firstName;
      this.lastName=lastName;
      this.birthDay=birthDay
      this.addresses=addresses
    }
  }
