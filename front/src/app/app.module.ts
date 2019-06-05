import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenesComponent } from './genes/genes.component';
import { RsidComponent } from './rsid/rsid.component';
import { AnalizComponent } from './analiz/analiz.component';
import { GroupsComponent } from './groups/groups.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ErrorsService } from './errors.service';
import { DataService } from './data.service';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { AddGeneComponent } from './genes/add-gene/add-gene.component';
import { AddRsidComponent } from './genes/add-rsid/add-rsid.component';
import { EditRsidComponent } from './rsid/edit-rsid/edit-rsid.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    GenesComponent,
    RsidComponent,
    AnalizComponent,
    GroupsComponent,
    LoginComponent,
    LogoutComponent,
    AddGeneComponent,
    AddRsidComponent,
    EditRsidComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,

  ],
  providers: [AuthService, AuthGuardService, ErrorsService, DataService],
  bootstrap: [AppComponent],
  entryComponents: [
    AddGeneComponent,
    AddRsidComponent,
    EditRsidComponent,
    ConfirmationDialogComponent
  ]
})
export class AppModule { }
