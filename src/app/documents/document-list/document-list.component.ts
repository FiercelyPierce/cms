import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      1, 
      'Document 1', 
      'This is the first document', 
      'http://www.google.com', 
      []
    ),
    new Document(
      2, 
      'Document 2', 
      'This is the second document', 
      'http://www.google.com', 
      []
    ),
    new Document(
      3, 
      'Document 3', 
      'This is the third document', 
      'http://www.google.com', 
      []
    ),
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
