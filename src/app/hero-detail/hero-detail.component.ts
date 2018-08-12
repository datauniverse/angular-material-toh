import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Superhero } from '../superhero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  private superheroesDoc: AngularFirestoreDocument<Superhero>;
  superhero: Observable<Superhero>;
  newSuperheroName: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private afs: AngularFirestore
  ) {
    this.superheroesDoc = afs.doc<Superhero>('superheroes/' + this.route.snapshot.paramMap.get('id'));
    this.superhero = this.superheroesDoc.valueChanges();
    this.superhero.subscribe(hero => this.newSuperheroName = hero.name);
  }

  ngOnInit(): void { }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.superheroesDoc.update({ name: this.newSuperheroName });
  }
}
