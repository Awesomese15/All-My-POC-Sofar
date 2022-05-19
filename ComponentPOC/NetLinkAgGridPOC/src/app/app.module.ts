import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { FormsModule } from '@angular/forms';
import { CustomCellColorComponent } from './custom-cell-color/custom-cell-color.component';
import { CommonModule } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MyAutoCompleteComponent } from './auto-complete/auto-complete.component';
import { CustomPaginationComponent } from './custom-pagination/custom-pagination.component';
import { ServerSidePaginationComponent } from './server-side-pagination/server-side-pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PopoverModule } from 'ngx-smart-popover';


@NgModule({
  declarations: [
    AppComponent,
    MultiselectComponent,
    CustomCellColorComponent,
    MyAutoCompleteComponent,
    CustomPaginationComponent,
    ServerSidePaginationComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    NgMultiSelectDropDownModule.forRoot(),
    AutocompleteLibModule,
    FormsModule,
    NgxPaginationModule,
    PopoverModule
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
