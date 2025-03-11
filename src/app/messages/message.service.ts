import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService implements OnInit {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[];
  maxMessageId: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.http
      .get<Message[]>('https://ng-wdd-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
          this.messageChangedEvent.emit(this.messages.slice());
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  getMessage(id: number): Message {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  storeMessages() {
    let messages = JSON.stringify(this.messages);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http
      .put('https://ng-wdd-default-rtdb.firebaseio.com/messages.json', messages, {
        headers: headers
      })
      .subscribe(() => {
        this.messageChangedEvent.emit(this.messages.slice());
      });
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      let currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }
}
