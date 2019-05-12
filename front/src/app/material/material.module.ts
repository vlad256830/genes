import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatCheckboxModule,
  MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  exports: [
    FlexLayoutModule,
    LayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
})
export class MaterialModule { }
