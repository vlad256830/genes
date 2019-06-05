import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalizComponent } from './analiz/analiz.component';
import { GenesComponent } from './genes/genes.component';
import { RsidComponent } from './rsid/rsid.component';
import { GroupsComponent } from './groups/groups.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthGuardService } from './auth/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: '/genes', pathMatch: 'full' },
  { path: 'genes', component: GenesComponent },
  { path: 'rsid', component: RsidComponent },
  { path: 'groups', canActivate: [AuthGuardService], component: GroupsComponent },
  { path: 'analiz', canActivate: [AuthGuardService], component: AnalizComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
