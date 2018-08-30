import { Component, OnInit } from '@angular/core';
import { LogService } from '../helper/log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private log: LogService, private router: Router) { }

  ngOnInit() {
  }

  search(evt: any) {
    const search = evt.target.value;

    if (search.startsWith('G')) {
      this.router.navigate(['/account/' + search]);
    } else {
      this.router.navigate(['/tx/' + search]);
    }

    evt.target.value = '';
  }
}
