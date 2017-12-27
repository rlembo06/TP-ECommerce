import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing/app-routing.module';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TestComponent} from './test/test.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        TestComponent,
        DashboardComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
