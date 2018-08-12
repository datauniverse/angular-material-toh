import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap, map
 } from 'rxjs/operators';

 import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
 import { Superhero } from '../superhero';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  private superheroCollection: AngularFirestoreCollection<Superhero>;
  superheroes: Observable<Superhero[]>;
  private searchTerms = new Subject<string>();

  myControl = new FormControl();

  constructor(private afs: AngularFirestore) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.superheroes = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        this.superheroCollection = this.afs.collection<Superhero>('superheroes', ref => {
          return ref.orderBy('name').startAt(term).endAt(term + '\uf8ff').limit(10);
        });
        
        return this.superheroCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Superhero;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );
      })
    );
  }
}