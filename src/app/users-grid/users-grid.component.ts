import { Component,Input, OnInit } from '@angular/core';
import { ContactApp, DataService } from '../data.service';
import { ContactAppService } from "../contact-app.service";


import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BtnCellRenderer } from '../button-update/button-update.component';
import { ButtonDeleteComponent } from '../button-delete/button-delete.component';

@Component({
  selector: 'app-users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.css',]
})
export class UsersGridComponent implements OnInit {
  contacts : ContactApp[] = []
  contact : ContactApp ={
    firstName:'',
    lastName:'',
    id:0,
    birthDay:'',
    addresses:[]
  }
  edit = true;
  add = false;
  private gridApi: any;
  rowData: {}[];

  getContacts = () => {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts
      this.rowData = contacts.map(contact => {
        let addressBase = contact.addresses[0] 
        let addressToAppend = `${addressBase.type} : ${addressBase.numero} ${addressBase.rue}, ${addressBase.ville}, ${addressBase.cp}, ${addressBase.pays} `
        let rowToAppend = {
          id: contact.id,
          Prenom: contact.firstName,
          Nom: contact.lastName,
          'Date de naissance': contact.birthDay,
          Adresse: addressToAppend
        }
        return rowToAppend
      })
    });
  }

  columnDefs = [
    { field: 'Prenom',width:150 },
    { field: 'Nom' },
    { field: 'Date de naissance',width:120},
    { field:'Adresse',resizable:true},
    {
      field: '',
      cellRenderer: 'btnCellRenderer',
      cellRendererParams: {
        
      }
    },
    {
      field: '',
      cellRenderer: 'btnCellDelete',
      cellRendererParams: {
        updateContactList: this.getContacts
      }
    }
    
    
  ];
  
  frameworkComponents = {
    btnCellRenderer: BtnCellRenderer,
    btnCellDelete:ButtonDeleteComponent
  };
  
  profileForm: any;
  constructor(private dataservice: DataService, private contactService:ContactAppService,private router:ActivatedRoute) {
    this.rowData = []
   }

  onGridReady(params: any) {
    this.gridApi = params.api;
    params.api.setRowData(this.contacts);
  }

  renderData(){

  }
  ngOnInit(): void {
    this.getContacts()
    this.renderData()
    console.log(this.router.snapshot.params)
  }
 
}
