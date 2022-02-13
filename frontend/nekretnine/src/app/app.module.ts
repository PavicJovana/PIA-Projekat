import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin/admin.component';
import { AddAgencyComponent } from './add-agency/add-agency.component';
import { AgentComponent } from './agent/agent.component';
import { BuyerComponent } from './buyer/buyer.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { UploadOfferComponent } from './upload-offer/upload-offer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    AdminComponent,
    AddAgencyComponent,
    AgentComponent,
    BuyerComponent,
    AddOfferComponent,
    UploadOfferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
