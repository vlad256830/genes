import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalizComponent } from './analiz/analiz.component';
import { GenesComponent } from './genes/genes.component';
import { RsidComponent } from './rsid/rsid.component';
import { GroupsComponent } from './groups/groups.component';


const routes: Routes = [
  { path: '', redirectTo: '/analiz', pathMatch: 'full' },
  { path: 'genes', component: GenesComponent },
  { path: 'rsid', component: RsidComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'analiz', component: AnalizComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
