import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from 'underscore';
import { Router } from '@angular/router';
declare var StellarSdk: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  // server: any;

  // newAccKeyPair: any;

  // pubKey = 'GBUOLX457THF3M3HSHH3L2ZJXLYMLZHUX2BRKCU2B6BHOXXXPMQBJZB4';
  // secKey = 'SAXMVY4QWHL7Y7ASQXHUGKJM2UXZTGRAESTSHVZJ3GNZAFAQOBCBF6LX';
  // tranId = '7394d270e0decdc75c593af75a1d2d3cc869cd72cf258dd30fe678aa7f72308e';

  // tranIdRes: any;
  // tranXDR: any;
  // accBalance = 0;
  // accBalResponse: any;

  accId: string;
  // accSeq: string;

  // accLoaded = false;
  // accLoading = false;

  constructor(private http: HttpClient, private router: Router) {

    // this.server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  }

  // createAccount() {

  //   this.newAccKeyPair = StellarSdk.Keypair.random();

  //   this.pubKey = this.newAccKeyPair.publicKey();
  //   this.secKey = this.newAccKeyPair.secret();

  //   console.log(this.newAccKeyPair.publicKey());
  //   console.log(this.newAccKeyPair.secret());
  // }

  // getAccountBalance() {

  //   this.accLoading = true;
  //   this.accLoaded = false;
  //   this.server.loadAccount(this.pubKey).then((res) => {
  //     this.accBalResponse = res;

  //     this.accSeq = res.sequence;
  //     _.each(res.balances, (data) => {
  //       if (data.asset_type === 'native') {
  //         this.accBalance = data.balance;
  //       }

  //       this.accLoading = false;
  //       this.accLoaded = true;
  //     });

  //   });
  // }

  // getTranDetail() {

  //   this.server.transactions().transaction(this.tranId).call().then((res) => {
  //     this.tranIdRes = res;

  //     this.tranXDR = StellarSdk.xdr.TransactionResult.fromXDR(res.result_xdr, 'base64');
  //   });

  //   this.server.transactions().forAccount(this.pubKey).call().then((res) => {
  //     // this.tranIdRes = res;
  //   });
  // }

  ngOnInit() {
  }

  findAccount() {

    this.router.navigate(['/account/' + this.accId]);
  }
}
