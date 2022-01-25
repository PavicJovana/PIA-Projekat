import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAgencyComponent } from './add-agency/add-agency.component';
import { AdminComponent } from './admin/admin.component';
import { AgentComponent } from './agent/agent.component';
import { BuyerComponent } from './buyer/buyer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/add-agency', component: AddAgencyComponent},
  //{path: 'add-location'}
  {path: 'agent', component: AgentComponent},
  //{path: 'agent/manageEstate'}
  //{path: 'agent/editEstate}
  {path: 'buyer', component: BuyerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
