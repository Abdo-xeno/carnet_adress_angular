import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ContactAppService } from "../contact-app.service";
import { ActivatedRoute } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';
import { formatDate } from "@angular/common";




@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  uniqueKeys=true;
  adressesTypes=[''];

  contact = {
    firstName: '',
    lastName: '',
    birthDay: '',
    addresses: [{}]
  }
  maxDate: any;

  constructor(private fb: FormBuilder, private contactService: ContactAppService, private router: ActivatedRoute, private dateAdapter: DateAdapter<Date>) {
    const currentDate = new Date()
    this.maxDate = new Date(currentDate);
    this.dateAdapter.setLocale('fr-FR'); //dd/MM/yyyy
  }

  addressTypeValidator: ValidatorFn = (control: any): ValidationErrors | null => {
    const addresses : any[] = control.get('addresses').controls;
    const types = addresses.map(address => address.value.type)
    // Verify if we only have unique values
    let uniqueElements = [... new Set(types)]
    return uniqueElements.length != types.length ? {addressKeys: 'NOK'}: null;
  };



  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    birthDay: [''],
    // addresses array of objects (addresse)
    addresses: this.fb.array([
      this.addAddressFormGroup()
    ])
  }, { validators: this.addressTypeValidator });

  get addresses() {
    return this.profileForm.get('addresses') as FormArray;
  }

  addAddress() {
    this.addresses.push(this.addAddressFormGroup());
  }

  // addresse format
  addAddressFormGroup(): FormGroup {
    return this.fb.group({
      type: [''],
      rue: [''],
      numero: [''],
      cp: [''],
      ville: [''],
      pays: [''],
      numéroTel: [''],
      commentaire: [''],
    })
  }

  // Change date format 
  formatFormDate(date: Date) {
    return formatDate(date, "DD/MM/YYYY", "fr");
  }

  // Fill the form with contact values
  updateContactByIdOnForm(id: string) {
    this.contactService.getContactById(parseInt(id)).subscribe(contact => {
      this.contact = contact
      // add address blocks as needed (we already have 1)
      let numAddressesBlocksToAddToForm = contact.addresses.length - 1
      for (let i = 0; i < numAddressesBlocksToAddToForm; i++) {
        this.addAddress()
      }
      let birthDay = moment(contact.birthDay, "DD/MM/YYYY").toDate()
      this.profileForm.patchValue({
        firstName: contact.firstName,
        lastName: contact.lastName,
        birthDay: birthDay,
        addresses: contact.addresses,
      });
    })
  }

  // Update the contact from the form
  updateContact() {
    let retrievedId = this.router.snapshot.queryParamMap.get('id') || ""
    let contactToUpdate = {
      id: parseInt(retrievedId),
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      birthDay: moment(this.profileForm.value.birthDay).format('DD/MM/YYYY'),
      addresses: this.profileForm.value.addresses
    }
    this.contactService.UpdateContact(contactToUpdate).subscribe(response => console.log("Contact Updated"))
  }

  // Add a new contact
  addContact() {
    let contactToAdd = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      birthDay: moment(this.profileForm.value.birthDay).format('DD/MM/YYYY'),
      addresses: this.profileForm.value.addresses
    }
    //{...this.profileForm.value, adresses: this.profileForm.value.secondaryAdresses}
    this.contactService.AddContact(contactToAdd).subscribe(response => {
      console.log("Contact Added")
    })

  }

  // Check if we're editing a contact or adding
  saveContact() {
    // get Id from the route
    let retrievedId = this.router.snapshot.queryParamMap.get('id')
    if (retrievedId) {
      this.updateContact()
    } else {
      this.addContact()
    }
  }

  ngOnInit(): void {
    let id = this.router.snapshot.queryParamMap.get('id')
    if (id) {
      this.updateContactByIdOnForm(id)
    }
  }

}
