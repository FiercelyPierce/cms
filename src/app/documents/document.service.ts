import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documtents: Document[];
  maxDocumentId: number;

  constructor() {
    this.documtents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  ngOnInit() {
  }
  
  getDocuments(): Document[] {
    return this.documtents.slice();
  }

  getDocument(id: number): Document {
    for (let document of this.documtents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documtents) {
      if (document.id > maxId) {
        maxId = document.id;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument === null || newDocument === undefined) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId;
    this.documtents.push(newDocument);
    this.documentListChangedEvent.next(this.documtents.slice());
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (
      originalDocument === null || 
      originalDocument === undefined || 
      newDocument === null || 
      newDocument === undefined
    ) {
      return;
    }

    const pos = this.documtents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documtents[pos] = newDocument;
    this.documentListChangedEvent.next(this.documtents.slice());
  }

  deleteDocument(document: Document) {
    if (document === null || document === undefined) {
      return;
    }

    const pos = this.documtents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documtents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documtents.slice());
  }
}
