import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StellarService } from '../../helper/stellar.service';
import { LogService } from '../../helper/log.service';
import * as _ from 'underscore';
declare var StellarBase: any;
@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.css']
})
export class AccountViewComponent implements OnInit, OnDestroy {

  accId: string;

  loading = false;
  loadingOps = false;
  accountNotExist = false;
  account: any;
  accountOps: any;

  accBalance: number;

  opCursor = 'now';

  accStream: any;

  constructor(private route: ActivatedRoute,
    private stellar: StellarService,
    private log: LogService,
    private cdr: ChangeDetectorRef) {
    route.params.subscribe(val => {
      this.opCursor = 'now';
      this.accountOps = null;
      this.accountNotExist = false;
      this.accId = this.route.snapshot.paramMap.get('id');

      if (this.accId !== null) {
        this.loadAccount();
      }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.accStream) {
      this.accStream();
    }
  }

  loadAccountOnly() {
    this.stellar.server.accounts().accountId(this.accId).call().then(res => {
      // this.log.error(res);



      this.account = res;

      _.each(this.account.balances, (data) => {
        if (data.asset_type === 'native') {
          this.accBalance = data.balance;
        }

      });

      if (this.cdr) {
        this.cdr.detectChanges();
      }
      this.loading = false;

      this.accountNotExist = false;
    }, err => {
      this.accountNotExist = true;
    });
  }

  loadAccount() {
    this.loading = true;

    this.stellar.server.accounts().accountId(this.accId).call().then(res => {
      // this.log.error(res);



      this.account = res;

      _.each(this.account.balances, (data) => {
        if (data.asset_type === 'native') {
          this.accBalance = data.balance;
        }

      });

      this.loading = false;

      this.accountNotExist = false;
    }, err => {
      this.accountNotExist = true;
    });

    this.loadingOps = true;

    this.stellar.server.operations().forAccount(this.accId).order('desc').cursor(this.opCursor).limit(10).call().then(res2 => {
      this.accountOps = res2.records;


      this.loadingOps = false;

      _.each(this.accountOps, data => {
        data.txType = this.stellar.getTxType2(data.type);

        this.opCursor = data.paging_token;


      });

      // this.log.error(this.accountOps);
      this.listenForAccChanged();
    });

  }

  listenForAccChanged() {
    this.accStream = this.stellar
      .server
      .operations()
      .forAccount(this.accId)
      .cursor('now')
      .stream({
        onmessage: (message) => {

          message.txType = this.stellar.getTxType2(message.type);

          this.accountOps.unshift(message);
          if (this.cdr) {
            this.cdr.detectChanges();
          }
          this.loadAccountOnly();


        }
      });
  }
  loadMore() {

    this.loadingOps = true;

    this.stellar.server.operations().forAccount(this.accId).order('desc').cursor(this.opCursor).limit(10).call().then(res2 => {

      _.each(res2.records, data => {
        data.txType = this.stellar.getTxType2(data.type);

        this.accountOps.push(data);

        this.opCursor = data.paging_token;
      });

      this.loadingOps = false;
    });
  }
}
