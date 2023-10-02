import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {HomeComponent} from "./public/pages/home/home.component";
import {HealthChecksComponent} from "./analytics/pages/health-checks/health-checks.component";

const routes: Routes = [
  { path: '', redirectTo: '/home',  pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'analytics/health-checks', component: HealthChecksComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
