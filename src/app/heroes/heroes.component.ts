import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Superhero } from '../superhero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  private superheroCollection: AngularFirestoreCollection<Superhero>;
  superheroes: Observable<Superhero[]>;

  constructor(private afs: AngularFirestore) { 
    this.superheroCollection = this.afs.collection<Superhero>('superheroes');
    this.superheroes = this.superheroCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Superhero;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  ngOnInit() { }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.superheroCollection.add({ name: name });
  }

  delete(superhero: Superhero): void {
    this.superheroCollection.doc(superhero.id).delete();
  }
}