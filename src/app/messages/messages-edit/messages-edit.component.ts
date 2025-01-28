import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-messages-edit',
  standalone: false,
  
  templateUrl: './messages-edit.component.html',
  styleUrl: './messages-edit.component.css'
})
export class MessagesEditComponent {
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('message') messageTextInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender = 'Pierce';

  onSendMessage() {
    const subjectValue = this.subjectInputRef.nativeElement.value;
    const messageValue = this.messageTextInputRef.nativeElement.value;

    const newMessage = new Message(4, subjectValue, messageValue, this.currentSender);

    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.messageTextInputRef.nativeElement.value = '';
  }
}
