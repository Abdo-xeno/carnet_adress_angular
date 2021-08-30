import { OnDestroy } from '@angular/core';
import { Component} from '@angular/core';
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
    this.contactService.DeleteContact(this.id).subscribe(contact => this.params.updateContactList());
  }

  ngOnDestroy() {

  }
}