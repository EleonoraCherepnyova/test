import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ManagerComponent } from './manager/manager.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { LoaderComponent } from './loader/loader.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { BreadcrumpsComponent } from './breadcrumps/breadcrumps.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [						
    AppComponent,
      ManagerComponent,
      Step1Component,
      Step2Component,
      Step3Component,
      LoaderComponent,
      ErrorPageComponent,
      ButtonsComponent,
      BreadcrumpsComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
