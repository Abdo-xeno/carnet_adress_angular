import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DataService, ContactApp } from '../data.service';
import { ContactAppService } from "../contact-app.service";
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  
  constructor(private fb: FormBuilder, private dataservice: DataService, private contactService: ContactAppService, private router: ActivatedRoute) {
   }

  
  contact={
    firstName:'',
    lastName:'',
    birthDay:'',
    addresses:[{}]
  }


  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    birthday: [''],
    addresses: this.fb.array([
      this.addAddressFormGroup()
    ])
  });

  get addresses() {
    return this.profileForm.get('addresses') as FormArray;
  }

  editOrAdd() {
    if (this.router.snapshot.params.id) {
      return true
    }
    return false
  }

  addAddress() {
    this.addresses.push(this.addAddressFormGroup());
  }

  addAddressFormGroup(): FormGroup {
    return this.fb.group({
      type: [''],
      rue: [''],
      numero: [''],
      cp: [''],
      ville: [''],
      pays:[''],
      commentaire: ['']

    })
  }




  updateContactByIdOnForm(id: string) {
    this.contactService.getContactById(parseInt(id)).subscribe(contact => {
      this.contact = contact
      // add address blocks as needed (we already have 1)
      let numAddressesBlocksToAddToForm = contact.addresses.length - 1
      for (let i=0; i<numAddressesBlocksToAddToForm; i++){
        this.addAddress()
      }
      this.profileForm.patchValue({
        firstName: contact.firstName,
        lastName: contact.lastName,
        birthDay:contact.birthDay,
        addresses: contact.addresses,
        });
    })
  }


  

  extractContactFromFormValues(){
    return {...this.contact, ...this.profileForm.value}
  }

  updateContact() {
    this.contactService.UpdateContact(this.extractContactFromFormValues()).subscribe(response => console.log(response))
  }


  addContact() {
    let contactToAdd = {
      firstName: this.profileForm.value.firstName,
      lastName:  this.profileForm.value.lastName,
      birthDay: this.profileForm.value.birthday,
      addresses: this.profileForm.value.addresses
    }
    //{...this.profileForm.value, adresses: this.profileForm.value.secondaryAdresses}
    this.contactService.AddContact(contactToAdd).subscribe(response => {
      console.log(response)
    })

  }

  saveContact(){
    let retrievedId = this.router.snapshot.queryParamMap.get('id')
    if (retrievedId){
      this.updateContact()
    }else{
      this.addContact()
    }
  }

  ngOnInit(): void {
    let id = this.router.snapshot.queryParamMap.get('id')
    if (id){
      this.updateContactByIdOnForm(id)
    }
  }


}
