import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'cms-messages-item',
  standalone: false,
  templateUrl: './messages-item.component.html',
  styleUrl: './messages-item.component.css'
})
export class MessagesItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    const contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name
  }
}
