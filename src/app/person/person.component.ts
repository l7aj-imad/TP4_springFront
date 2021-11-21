import { PersonService } from '../services/person.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Person} from "../types/person.types";


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {
  @Input() person: Person;
  @Output() delete: EventEmitter<number>;
  @Output() update: EventEmitter<Person>;
  openU: boolean;

  constructor(private personService: PersonService) {
    this.person = {} as Person;
    this.delete = new EventEmitter();
    this.update = new EventEmitter();
    this.openU = false;
  }

  save(p: Person) {
    this.personService.update(p).subscribe(res => this.update.emit(p), err => console.error(err));
  }

  onDelete(id: number) {
    this.personService.delete(id).subscribe(res => {
      this.delete.emit(id);

    }, err => console.error(err));
  }

}
