import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';

import { AppRoutingModule } from './app-routing.module';
import { AccountComponent } from './account/account.component';
import { AccountCreateComponent } from './account/account-create/account-create.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AccountViewComponent } from './account/account-view/account-view.component';
import { TxViewComponent } from './transaction/tx-view/tx-view.component';
import { LedgerViewComponent } from './ledger-view/ledger-view.component';
import { StellarService } from './helper/stellar.service';
import { LogService } from './helper/log.service';
import { OperationComponent } from './transaction/operation/operation.component';

// enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    NavigationComponent,
    AccountComponent,
    AccountCreateComponent,
    TransactionComponent,
    AccountViewComponent,
    TxViewComponent,
    LedgerViewComponent,
    OperationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [StellarService, LogService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));


  }
}
