import { Injectable } from '@angular/core';

declare var StellarSdk: any;

@Injectable({
  providedIn: 'root'
})
export class StellarService {

  server: any;
  constructor() {
    this.server = new StellarSdk.Server('https://horizon.stellar.org');
  }

  getServer() {
    return this.server;
  }

  getSDK() {
    return StellarSdk;
  }
  getTxType2(inType: string) {
    switch (inType) {
      case 'allow_trust': {
        return 'Allow Trust';
      }
      case 'account_merge': {
        return 'Account Merge';
      }
      case 'inflation': {
        return 'Inflation';
      }
      case 'manage_data': {
        return 'Manage Data';
      }
      case 'set_options': {
        return 'Set Options';
      }
      case 'create_passive_offer': {
        return 'Buying / Selling';
      }
      case 'manage_offer': {
        return 'Manage Offer';
      }
      case 'path_payment': {
        return 'Path Payment';
      }
      case 'payment': {
        return 'Payment';
      }
      case 'create_account': {
        return 'Create Account';
      }
      case 'change_trust': {
        return 'Change Trust';
      }
      default: {
        return inType;
      }
    }
  }

  numberWithCommas(x) {

    x = (x * 1).toString();
    const parts = x.split('.');
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');
  }

  getTxType(inType: string) {
    switch (inType) {
      case 'allowTrust': {
        return 'Allow Trust';
      }
      case 'accountMerge': {
        return 'Account Merge';
      }
      case 'inflation': {
        return 'Inflation';
      }
      case 'manageData': {
        return 'Manage Data';
      }
      case 'setOptions': {
        return 'Set Options';
      }
      case 'createPassiveOffer': {
        return 'Buying / Selling';
      }
      case 'manageOffer': {
        return 'Manage Offer';
      }
      case 'pathPayment': {
        return 'Path Payment';
      }
      case 'payment': {
        return 'Payment';
      }
      case 'createAccount': {
        return 'Create Account';
      }
      case 'changeTrust': {
        return 'Change Trust';
      }
      default: {
        return inType;
      }

    }
  }
}
