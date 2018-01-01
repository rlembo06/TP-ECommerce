import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing/app-routing.module';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';

import {AuthentificationService} from '../services/authentification.service';
import {GuardService} from '../services/guard.service';

import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpModule,
        JsonpModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent
    ],
    providers: [
        AuthentificationService,
        GuardService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
