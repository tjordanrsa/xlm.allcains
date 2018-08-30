import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from '../helper/log.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  txId: string;
  constructor(private router: Router, private log: LogService) { }

  ngOnInit() {
  }

  findAccount() {

    this.log.error(this.txId);

    this.router.navigate(['/tx/' + this.txId]);
  }

}
