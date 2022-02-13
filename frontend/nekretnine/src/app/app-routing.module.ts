import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAgencyComponent } from './add-agency/add-agency.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { AdminComponent } from './admin/admin.component';
import { AgentComponent } from './agent/agent.component';
import { BuyerComponent } from './buyer/buyer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadOfferComponent } from './upload-offer/upload-offer.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/add-agency', component: AddAgencyComponent},
  {path: 'agent', component: AgentComponent},
  {path: 'agent/add-offer', component: AddOfferComponent},
  {path: 'agent/upload-offer', component: UploadOfferComponent},
  {path: 'buyer', component: BuyerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
