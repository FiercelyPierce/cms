import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-messages-list',
  standalone: false,
  
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css'
})
export class MessagesListComponent {
  messages: Message[] = [
    new Message(1, 'Hello', 'Hello from the other side', 'Pierce'),
    new Message(2, 'Hi', 'Hi there', 'Macey'),
    new Message(3, 'Hey', 'Hey there', 'Sage')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
