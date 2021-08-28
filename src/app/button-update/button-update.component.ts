import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'btn-cell-renderer',
  templateUrl: './button-update.component.html',
})
export class BtnCellRenderer implements ICellRendererAngularComp, OnDestroy {
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  
  private params: any;
  
  id: any

  agInit(params: any): void {
    this.params = params;
    console.log(this.params.data)
    this.id = params.data.id
  }


  ngOnDestroy() {
    // no need to remove the button click handler 
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }
}