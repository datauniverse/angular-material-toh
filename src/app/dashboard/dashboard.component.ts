import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Superhero } from '../superhero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  private superheroCollection: AngularFirestoreCollection<Superhero>;
  superheroes: Observable<Superhero[]>;

  constructor(private afs: AngularFirestore) {
    this.superheroCollection = this.afs.collection<Superhero>('superheroes', ref => {
      return ref.limit(4);
    });

    this.superheroes = this.superheroCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Superhero;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  ngOnInit() { }
}
