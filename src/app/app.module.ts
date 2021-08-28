import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppareilService } from './services/appareil.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppareilComponent } from './appareil/appareil.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AgGridModule } from 'ag-grid-angular';
import { UsersGridComponent } from './users-grid/users-grid.component';

import { DataService } from './data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { BtnCellRenderer } from './button-update/button-update.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonDeleteComponent } from './button-delete/button-delete.component';

const appRoutes: Routes = [
  { path: 'contactForm', component: ContactFormComponent },
  { path: 'list', component: UsersGridComponent },
  { path: 'contactForm/:id', component: ContactFormComponent  },
  
];




@NgModule({
  declarations: [
    AppComponent,
   
    AppareilComponent,
    ContactFormComponent,
    UsersGridComponent,
    BtnCellRenderer,
    ButtonDeleteComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    AgGridModule.withComponents([BtnCellRenderer]),
    environment.production ?[]: HttpClientInMemoryWebApiModule.forRoot(DataService),
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
    
  ],
  exports:[ContactFormComponent],
  providers: [
    AppareilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
