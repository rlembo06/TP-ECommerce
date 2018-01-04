/*
 * TUTO : http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GuardService} from '../../services/guard.service';

import {DashboardComponent} from '../dashboard/dashboard.component';
import {LoginComponent} from '../login/login.component';
import {UserComponent} from '../user/user.component';
import {PannierComponent} from '../pannier/pannier.component';

const routes: Routes = [
    { path: '', component: DashboardComponent},
    
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
