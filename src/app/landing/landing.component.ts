import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as _ from 'underscore';
import { StellarService } from '../helper/stellar.service';
import { LogService } from '../helper/log.service';
declare var StellarSdk: any;
declare var StellarBase: any;
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {


  server: any;

  ledgerRecords = [];
  ledgerLoaded = false;
  ledgerLoading = true;

  ledgerRowLimit = 5;
  ledgerStream: any;

  txRecords = [];
  txLoaded = false;
  txLoading = true;

  txRowLimit = 30;
  txStream: any;

  txDetail: any;

  constructor(private cdr: ChangeDetectorRef,
    private stellar: StellarService,
    private log: LogService,
    private http: HttpClient) {
    this.server = stellar.getServer();
  }

  ngOnInit() {

    this.loadLastLedger();
    this.loadLastTx();

    this.http.get('https://api.coinmarketcap.com/v2/ticker/512/').subscribe(res => {
      console.error(res);
    });
  }

  ngOnDestroy() {
    this.stopStream();
  }

  invokeChangeDetect() {

    if (this.cdr) {
      this.cdr.detectChanges();
    }
  }

  loadLastLedger() {

    this.ledgerLoading = true;

    this.server.ledgers().limit(this.ledgerRowLimit).order('desc').call().then(res => {

      this.ledgerLoaded = true;
      this.ledgerLoading = false;
      this.ledgerRecords = res.records;

      this.ledgerStream = this.server.ledgers().cursor('now').stream({
        onmessage: (message) => {

          message.isnew = true;

          setTimeout(() => {
            message.isnew = false;

            this.invokeChangeDetect();
          }, 200);
          this.ledgerRecords.unshift(message);

          while (this.ledgerRecords.length > this.ledgerRowLimit) {
            this.ledgerRecords.pop();
          }

          this.invokeChangeDetect();
        }
      });

    });



    // Stop the stream
    // this.ledgerStream();
  }

  loadLastTx() {

    this.txLoading = true;

    this.server.transactions().limit(this.txRowLimit).order('desc').call().then(res => {

      this.txLoaded = true;
      this.txLoading = false;

      const records = res.records;
      _.each(records, data => {

        const txd = StellarSdk.xdr.TransactionEnvelope.fromXDR(data.envelope_xdr, 'base64');

        data.tran = new StellarBase.Transaction(data.envelope_xdr);
        data.tranType = this.stellar.getTxType(data.tran.operations[0].type);
        data.asset = data.tran.operations[0].asset;
      });

      this.txRecords = records;

      // this.log.error(records);



      this.txStream = this.server.transactions().cursor('now').stream({
        onmessage: (message) => {

          // this.log.error(message);
          message.isnew = true;

          const tran = new StellarBase.Transaction(message.envelope_xdr);

          message.tran = tran;

          message.tranType = this.stellar.getTxType(tran.operations[0].type);
          message.asset = tran.operations[0].asset;
          // this.log.error(tran);
          // const txd = StellarSdk.xdr.TransactionEnvelope.fromXDR(message.envelope_xdr, 'base64');

          // message.operations().then(ops => {
          //   this.log.error(ops);

          //   message.ops = ops;
          //   message.tranType = ops.records[0].type;
          // });


          // console.log( JSON.stringify(StellarSdk.xdr.TransactionEnvelope.fromXDR(message.envelope_xdr, 'base64')) );
          // console.log( JSON.stringify(StellarSdk.xdr.TransactionResult.fromXDR(message.result_xdr, 'base64')) );
          // console.log( JSON.stringify(StellarSdk.xdr.TransactionMeta.fromXDR(message.result_meta_xdr, 'base64')) );

          setTimeout(() => {
            message.isnew = false;
            this.invokeChangeDetect();
          }, 200);
          this.txRecords.unshift(message);

          while (this.txRecords.length > this.txRowLimit) {
            this.txRecords.pop();
          }

          this.invokeChangeDetect();
        }
      });

    });



    // Stop the stream
    // this.ledgerStream();
  }

  stopStream() {
    // Stop the stream
    this.ledgerStream();

    // Stop the tran stream
    this.txStream();
  }

  tranOutput(tran: any) {

    console.error(tran);
    this.txDetail = StellarSdk.xdr.TransactionEnvelope.fromXDR(tran.envelope_xdr, 'base64');

    const fee = StellarSdk.xdr.TransactionResult.fromXDR(tran.result_xdr, 'base64');
    const feeMeta = StellarSdk.xdr.TransactionMeta.fromXDR(tran.result_meta_xdr, 'base64');

    console.error(this.txDetail._attributes.tx._attributes.operations[0]._attributes.body._switch.name);
    // console.error(fee);
    // console.error(feeMeta);

    console.error(tran.effects());
  }
}
