/*
 * TUTO : http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from '../dashboard/dashboard.component';
import {LoginComponent} from '../login/login.component';
import {GuardService} from '../../services/guard.service';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: DashboardComponent, canActivate: [GuardService] },
    //{ path: 'dashboard', component: DashboardComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ],
    declarations: []
})
export class AppRoutingModule {}
