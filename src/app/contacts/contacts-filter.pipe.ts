import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {
    let filteredArray: Contact[] = [];
    
    if (term && term.length > 0) {
      term = term.toLowerCase();
      filteredArray = contacts.filter(
        (contact: Contact) => contact.name.toLowerCase().includes(term)
      );
    }

    if (filteredArray.length < 1) {
      return contacts;
    }
    return filteredArray;
  }
}
