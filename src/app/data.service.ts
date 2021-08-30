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
          
          firstName: 'Sam',
          lastName: 'Torat',
          id: 1,
          birthDay:'17/05/2005',
          addresses:[{type: 'principale',  numero:'95',rue:'avenue de Caen',ville:'Rouen',cp:'76100',pays:'France',numéroTel:'0787594163',commentaire:'disponible entre 8h et 18h'}]
        },
        {
          
          firstName: 'Pauline',
          lastName: 'Fredo ',
          id: 2,
          birthDay:'28/11/1995',
          addresses:[{type: 'principale',  numero:'14',rue:'boulevard Anfa',ville:'Casablanca',cp:'20100',pays:'Maroc',numéroTel:'0698041524',commentaire:'toujours disponible'}]
        },
        {
        
          firstName: 'Jean-Pierre',
          lastName: 'Macagno',
          id: 3,
          birthDay:'03/05/1985',
          addresses:[{type: 'principale',  numero:'15',rue:'ernest Renan',ville:'bordeaux',cp:'36100',pays:'France',numéroTel:'0714265387',commentaire:'contacter à partir de 14h'},
                     {type: 'travail',  numero:'20',rue:'mestre',ville:'bordeaux',cp:'36000',pays:'France',numéroTel:'0712786345',commentaire:'disponible entre 8h et 18h'}]
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
