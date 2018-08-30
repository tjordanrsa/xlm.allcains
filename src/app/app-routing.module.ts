import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AccountComponent } from './account/account.component';
import { AccountCreateComponent } from './account/account-create/account-create.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AccountViewComponent } from './account/account-view/account-view.component';
import { TxViewComponent } from './transaction/tx-view/tx-view.component';
import { LedgerViewComponent } from './ledger-view/ledger-view.component';

const routes: Routes = [

    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: 'landing', component: LandingComponent},
    // { path: 'account/create', component: AccountCreateComponent},
    { path: 'tx', component: TransactionComponent},
    { path: 'account', component: AccountComponent},
    { path: 'account/:id', component: AccountViewComponent},
    { path: 'tx', component: TxViewComponent},
    { path: 'tx/:id', component: TxViewComponent},
    { path: 'ledger/:id', component: LedgerViewComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes,
      {
        useHash: true,
        // enableTracing: true, // <-- debugging purposes only
        // preloadingStrategy: PreloadAllModules
      }
    )
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
