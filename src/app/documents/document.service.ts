import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentChangedEvent = new EventEmitter<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documtents: Document[];

  constructor() {
    this.documtents = MOCKDOCUMENTS;
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

  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }

    const pos = this.documtents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documtents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documtents.slice());
  }
}
