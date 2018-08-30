import { Component, OnInit, Input } from '@angular/core';
import { StellarService } from '../../helper/stellar.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  @Input()
  operation: any;

  @Input()
  source: string;

  @Input()
  index: number;

  opType: string;

  /*

  case 'allowTrust': {
        return 'Allow Trust';
      }
      case 'inflation': {
        return 'Inflation';
      }
      case 'createPassiveOffer': {
        return 'Buying / Selling';
      }
      case 'pathPayment': {
        return 'Path Payment';
      }
  */
  constructor(private stellar: StellarService) { }

  ngOnInit() {
    this.opType = this.stellar.getTxType(this.operation.type);

    if (this.operation.type === 'manageData') {
      this.setManageDataValue();
    }
  }

  setManageDataValue() {
    let str = '';

    _.each(this.operation.value, (data) => {
      str += String.fromCharCode(data);
    });

    this.operation.dataValue = str;
  }
}
