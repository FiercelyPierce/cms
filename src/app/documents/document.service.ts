import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
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
}
