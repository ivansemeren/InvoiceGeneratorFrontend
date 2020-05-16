import { ClientsModule } from './../clients/clients.module';
import { InvoicesModule } from './../invoices/invoices.module';
import { MaterialModule } from '../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../core/services/http-interceptor.service';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    InvoicesModule,
    ClientsModule,
    MaterialModule
  ],
  declarations: [DashboardComponent, SideNavComponent, ToolBarComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true
  }]
})
export class DashboardModule { }
