import { Component, OnInit } from '@angular/core';
import { Person } from './types/person.types';
import { PersonService } from './services/person.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  persons: Person[]
  personsByName: Person[]
  openC: boolean
  form!: FormGroup;

  constructor(private personService: PersonService) {
    this.openC = false;
    this.persons = {} as Person[];
    this.personsByName = {} as Person[];
    this.form = new FormGroup({
      nom: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.find();
    this.form = new FormGroup({
      nom: new FormControl(null, Validators.required),
    });
  }

  create(p: Person) {
    this.personService.create(p).subscribe(
      (res) => this.persons.push(res),
      (err) => console.error(err),
    );
  }

  delete(id: number) {
    this.persons = this.persons.filter(e => e.id != id)
    this.personsByName = this.personsByName.filter(e => e.id != id)
  }

  update(person: Person) {
    this.persons = this.persons.map(e => {
      if (e.id == person.id) {
        return person
      } return e
    })

    this.personsByName = this.personsByName.map(e => {
      if (e.id == person.id) {
        return person
      } return e
    })
  }

  get nom() {
    return <FormControl>this.form.get("nom")
  }

  find() {
    if (this.form.valid) {
      this.personService.findByNom(this.nom.value).subscribe(res => {
        this.persons = res;
      }, err => console.error(err))
    }
    else{
      this.personService.findAll().subscribe(res => {
        this.persons = res;
      }, err => console.error(err))
    }
  }

}
