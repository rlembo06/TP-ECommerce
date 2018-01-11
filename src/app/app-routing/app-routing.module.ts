/*
 * TUTO : http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GuardService} from '../../services/guard.service';
import {GuardAdminService} from '../../services/guard-admin.service';

import {DashboardComponent} from '../dashboard/dashboard.component';
import {LoginComponent} from '../login/login.component';
import {UserComponent} from '../user/user.component';
import {NewuserComponent} from '../user/newuser.component';
import {PannierComponent} from '../pannier/pannier.component';

import {AdminComponent} from '../admin/admin.component';
import {LoginAdminComponent} from '../login-admin/login-admin.component';

const routes: Routes = [
    { path: '', component: DashboardComponent},
    { path: 'newuser', component: NewuserComponent },

    { path: 'admin', component: AdminComponent, canActivate: [GuardAdminService] },

    { path: 'user', component: UserComponent, canActivate: [GuardService] },
    { path: 'pannier', component: PannierComponent, canActivate: [GuardService] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ],
    declarations: []
})
export class AppRoutingModule {}
