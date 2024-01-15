import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-termo-uso',
  templateUrl: './termo-uso.component.html',
  styleUrls: ['./termo-uso.component.scss']
})
export class TermoUsoComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  gotoLogin() {
    this.router.navigate(['login']);
  }

}
