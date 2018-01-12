import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Http, RequestOptions } from '@angular/http';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { SelectModule } from 'ng-select';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';

import {AuthentificationService} from '../services/authentification.service';
import {GuardService} from '../services/guard.service';
import {GuardAdminService} from '../services/guard-admin.service';
import {UserService} from '../services/user.service';
import {AdminService} from '../services/admin.service';

import { UserComponent } from './user/user.component';
import { NewuserComponent } from './user/newuser.component';
import { PannierComponent } from './pannier/pannier.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin.category.component';
import { AdminProductComponent } from './admin/admin.product.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';


@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        SelectModule,
        ConfirmationPopoverModule.forRoot({
            focusButton: 'confirm'
        })
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        UserComponent,
        NewuserComponent,
        PannierComponent,
        AdminComponent,
        AdminCategoryComponent,
        AdminProductComponent,
        LoginAdminComponent
    ],
    providers: [
        AuthentificationService,
        GuardService,
        GuardAdminService,
        UserService,
        AdminService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
