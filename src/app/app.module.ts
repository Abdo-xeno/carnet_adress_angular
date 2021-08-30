import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
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
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';


const appRoutes: Routes = [
  { path: 'contactForm', component: ContactFormComponent },
  { path: '', component: UsersGridComponent },
  { path: 'contactForm/:id', component: ContactFormComponent  },
  
];




@NgModule({
  declarations: [
    AppComponent,
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
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatDividerModule,
    MatExpansionModule
  ],
  exports:[ContactFormComponent],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
