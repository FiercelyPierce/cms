import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode = false;
  id: number;

  constructor(
    private ContactService: ContactService,
    private ActivatedRoute: ActivatedRoute,
    private Router: Router,
  ) { }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id === null || this.id === undefined) {
        this.editMode = false;
        return;
      }

      this.originalContact = this.ContactService.getContact(this.id);
      if (this.originalContact === null || this.originalContact === undefined) {
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if (this.contact.group && this.contact.group.length > 0) {
        this.groupContacts = this.contact.group.slice();
      }
    });
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newContact = new Contact(null, value.name, value.email, value.phone, value.imageUrl, this.groupContacts);

    if (this.editMode === true) {
      this.ContactService.updateContact(this.originalContact, newContact);
    } else {
      this.ContactService.addContact(newContact);
    }

    this.Router.navigate(['/contacts']);
  }

  onCancel() {
    this.Router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }

    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }

    return false;
  }
}
