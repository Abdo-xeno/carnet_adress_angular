import { Component,Input, OnInit } from '@angular/core';
import { ContactApp, DataService } from '../data.service';
import { ContactAppService } from "../contact-app.service";
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
        // Display contact addresses with this format in the grid
        let addressToAppend = `${addressBase.type} : ${addressBase.numero} ${addressBase.rue},
                               ${addressBase.ville},
                               ${addressBase.cp}, 
                               ${addressBase.pays},
                               ${addressBase.numéroTel},
                               ${addressBase.commentaire} `
        let birthDayToAppend=contact.birthDay.substring(0,10)
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
    { field: 'Prenom',width:120 },
    { field: 'Nom',width:120},
    { field: 'Date de naissance',width:150,},
    { field:'Adresse',resizable:true,width:470},
    // display the update button on the grid
    {
      field: '',
      cellRenderer: 'btnCellRenderer',
      width:80,
      cellRendererParams: {
        
      }
    },
    // display the delete button on the grid
    {
      field: '',
      cellRenderer: 'btnCellDelete',
      width:100,
      cellRendererParams: {
        updateContactList: this.getContacts
      }
    }
    
    
  ];
  
  // add the delete and update buttons to the grid
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
