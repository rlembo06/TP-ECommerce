import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { TextEqualityValidatorModule } from "ngx-text-equality-validator";

import { AppRoutingModule } from './app-routing/app-routing.module';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';

import {AuthentificationService} from '../services/authentification.service';
import {GuardService} from '../services/guard.service';

import { UserComponent } from './user/user.component';
import { NewuserComponent } from './user/newuser.component';
import { PannierComponent } from './pannier/pannier.component';


@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        TextEqualityValidatorModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        UserComponent,
        NewuserComponent,
        PannierComponent
    ],
    providers: [
        AuthentificationService,
        GuardService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
