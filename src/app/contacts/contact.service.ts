import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService implements OnInit {
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contacts: Contact[];
  maxContactId: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.http
      .get<Contact[]>('https://ng-wdd-default-rtdb.firebaseio.com/contacts.json')
        .subscribe(
          (contacts: Contact[]) => {
            this.contacts = contacts;
            this.maxContactId = this.getMaxId();
            this.contacts.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
            this.contactListChangedEvent.next(this.contacts.slice());
          },
          (error: any) => {
            console.error(error);
          }
        );
  }

  getContact(id: number): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  storeContacts() {
    let contacts = JSON.stringify(this.contacts);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put(
      'https://ng-wdd-default-rtdb.firebaseio.com/contacts.json',
      contacts,
      { headers: headers }
    ).subscribe(
      () => {
        this.contactListChangedEvent.next(this.contacts.slice());
      }
    );
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      if (contact.id > maxId) {
        maxId = contact.id;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact === null || newContact === undefined) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId;
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (
      originalContact === null || 
      originalContact === undefined || 
      newContact === null || 
      newContact === undefined
    ) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.storeContacts();
  }
}
