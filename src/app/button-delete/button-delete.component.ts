import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ContactAppService } from '../contact-app.service';


@Component({
  selector: 'btn-cell-delete',
  templateUrl: './button-delete.component.html',
})
export class ButtonDeleteComponent implements ICellRendererAngularComp, OnDestroy {
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  
  private params: any;
  
  id: any

  constructor(private contactService:ContactAppService) {
   }
  agInit(params: any): void {
    this.params = params;
    this.id = params.data.id
  }

  removeContact() {
    console.log(this.params.updateContactList)
    this.params.updateContactList()
    this.contactService.DeleteContact(this.id).subscribe(contact => console.log(contact));
    this.params.updateContactList()
  }

  ngOnDestroy() {
    // no need to remove the button click handler 
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }
}