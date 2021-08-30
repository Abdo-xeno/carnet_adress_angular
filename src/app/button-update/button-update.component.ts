import { OnDestroy } from '@angular/core';
import { Component} from '@angular/core';
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
    this.id = params.data.id
  }


  ngOnDestroy() {
    
  }
}