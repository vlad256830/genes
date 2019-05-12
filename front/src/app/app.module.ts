import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenesComponent } from './genes/genes.component';
import { RsidComponent } from './rsid/rsid.component';
import { AnalizComponent } from './analiz/analiz.component';
import { GroupsComponent } from './groups/groups.component';



@NgModule({
  declarations: [
    AppComponent,
    GenesComponent,
    RsidComponent,
    AnalizComponent,
    GroupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
