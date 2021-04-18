import { Program } from './../../models/program';
import { NewsService } from './../../services/news.service';
import { Contact } from './../../models/contact';
import { ValidateErrorStateMatcher } from './../../validator/validate-error-state-matcher';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  contactForm: FormGroup;
  programs: Program[];

  constructor(
    private fb: FormBuilder,
    private newsService: NewsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.validateForm();
    this.loadPrograms();
  }

  validateForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[A-Za-zs]+')]],
      family_name: [
        '',
        [Validators.required, Validators.pattern('[A-Za-zs]+')],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9_]{1,10}$')]],
      program: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    });
  }

  loadPrograms(){
    this.newsService.getPrograms().subscribe(programs => {
      this.programs = programs;
    });
  }

  onSubmit() {
    let contact: Contact = {
      name: this.contactForm.get('name')?.value,
      family_name: this.contactForm.get('family_name')?.value,
      phone: this.contactForm.get('phone')?.value,
      email: this.contactForm.get('email')?.value,
      program: this.contactForm.get('program')?.value.toString(),
      comment: this.contactForm.get('comment')?.value,
    };

    console.log('contact:' + JSON.stringify(contact));

    this.newsService.saveNew(contact).subscribe(() => {
      this.addMsg();
      this.contactForm.reset();
    });
  }

  addMsg() {
    this._snackBar.open('El contacto se guardo exitosamente', 'Info', {
      duration: 5000,
    });
  }

  matcher = new ValidateErrorStateMatcher();
}
