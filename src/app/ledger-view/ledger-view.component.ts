import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ledger-view',
  templateUrl: './ledger-view.component.html',
  styleUrls: ['./ledger-view.component.css']
})
export class LedgerViewComponent implements OnInit {

  ledgerId: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.ledgerId = this.route.snapshot.paramMap.get('id');
  }

}
