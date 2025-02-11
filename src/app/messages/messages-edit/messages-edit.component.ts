import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'cms-messages-edit',
  standalone: false,
  templateUrl: './messages-edit.component.html',
  styleUrl: './messages-edit.component.css'
})
export class MessagesEditComponent implements OnInit {
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('message') messageTextInputRef: ElementRef;

  currentSender = 1;

  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  onSendMessage() {
    const subjectValue = this.subjectInputRef.nativeElement.value;
    const messageValue = this.messageTextInputRef.nativeElement.value;

    const newMessage = new Message(4, subjectValue, messageValue, this.currentSender);

    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.messageTextInputRef.nativeElement.value = '';
  }
}
