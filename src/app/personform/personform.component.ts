import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Person} from "../types/person.types";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-personform',
  templateUrl: './personform.component.html',
  styleUrls: ['./personform.component.css']
})
export class PersonformComponent implements OnInit {

  _form: FormGroup;
  @Input() open: boolean;
  @Input() person: Person | undefined;
  @Output() save: EventEmitter<Person>;
  @Output() close: EventEmitter<void>;
  @ViewChild('el') el: { nativeElement: { contains: (arg0: any) => any; }; } | undefined;

  constructor() {
    this.open = false;
    this.save = new EventEmitter<Person>();
    this.close = new EventEmitter<void>();
    this._form = new FormGroup({

    });
  }

  ngOnInit(): void {
    this._form = new FormGroup({
      id: new FormControl(this.person?.id),
      prenom: new FormControl(this.person?.prenom, Validators.required),
      nom: new FormControl(this.person?.nom, Validators.required),
      adr: new FormControl(this.person?.adr, Validators.required),
      email: new FormControl(this.person?.email, Validators.required),
      tel: new FormControl(this.person?.tel, Validators.required),
    });
  }

  get prenom() {
    return this._form.get('prenom') as FormControl;
  }

  get nom() {
    return this._form.get('nom') as FormControl;
  }

  get adr() {
    return this._form.get('adr') as FormControl;
  }

  get tel() {
    return this._form.get('tel') as FormControl;
  }

  get email() {
    return this._form.get('email') as FormControl;
  }

  onSave(person: Person): void {
    this.save.emit(person);
    this.close.emit();
  }

  onClick(event: any) {
    if (this.el?.nativeElement?.contains(event?.target)) {
      return;
    }
    this.close.emit();
  }

}

