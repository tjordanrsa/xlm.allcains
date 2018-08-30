import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'underscore';
import { StellarService } from '../../helper/stellar.service';
import { LogService } from '../../helper/log.service';
declare var StellarBase: any;
@Component({
  selector: 'app-tx-view',
  templateUrl: './tx-view.component.html',
  styleUrls: ['./tx-view.component.css']
})
export class TxViewComponent implements OnInit {

  txId: string;

  ops: any;

  loading = false;

  txDetail: any;
  txFee: string;
  txNotExist = false;

  constructor(private route: ActivatedRoute,
    private stellar: StellarService,
    private log: LogService) {

    route.params.subscribe(val => {
      this.txId = this.route.snapshot.paramMap.get('id');
      this.txDetail = null;
      this.txFee = '';
      this.ops = null;

      if (this.txId !== null) {
        this.loadTx();
      }
    });

  }

  ngOnInit() {

  }

  loadTx() {

    this.loading = true;

    this.stellar.server.transactions().transaction(this.txId).call().then(res => {
      this.log.error(res);



      this.txDetail = res;


      this.ops = new StellarBase.Transaction(res.envelope_xdr);

      this.log.error(this.ops);

      const fee = this.ops.fee / 10000000;
      this.txFee = fee.toFixed(8) + ' XLM';

      // this.txDetail.timeago = $(this).timeago(res.created_at);

      this.loading = false;
      this.txNotExist = false;
    }, err => {
      this.txNotExist = true;
      this.loading = false;
    });

  }
}
