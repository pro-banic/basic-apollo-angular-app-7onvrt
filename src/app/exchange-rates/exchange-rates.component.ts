import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';


@Component({
  selector: 'exchange-rates',
  templateUrl: './exchange-rates.component.html',
})
export class ExchangeRates implements OnInit {
  buches$: Observable<any[]>;
  loading$: Observable<boolean>;
  errors$: Observable<any>;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    const source$ = this.apollo.query({
      query: gql`
      {
        buches {
          titel
          _id
          createdAt
          updatedAt
          autor
          ausgeliehen
          ausleiher {
            nachname
            createdAt
            updatedAt
            _id
          }
        }
      }
      `
    }).pipe(shareReplay(1));

    this.buches$ = source$.pipe(map(result => result.data && result.data.buches));
    this.loading$ = source$.pipe(map(result => result.loading));
    this.errors$ = source$.pipe(map(result => result.errors));
  }
}