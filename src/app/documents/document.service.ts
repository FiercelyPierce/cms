import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Document } from './document.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService implements OnInit {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documtents: Document[];
  maxDocumentId: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDocuments();
  }
  
  getDocuments() {
    this.http
      .get<Document[]>('https://ng-wdd-default-rtdb.firebaseio.com/documents.json')
        .subscribe(
          (documents: Document[]) => {
            this.documtents = documents;
            this.maxDocumentId = this.getMaxId();
            this.documtents.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
            this.documentListChangedEvent.next(this.documtents.slice());
          },
          (error: any) => {
            console.error(error);
          }
        );
  }

  getDocument(id: number): Document {
    for (let document of this.documtents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  storeDocuments() {
    let documents = JSON.stringify(this.documtents);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put(
      'https://ng-wdd-default-rtdb.firebaseio.com/documents.json',
      documents,
      { headers: headers }
    ).subscribe(
      () => {
        this.documentListChangedEvent.next(this.documtents.slice());
      }
    );
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
    this.storeDocuments();
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
    this.storeDocuments();
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
    this.storeDocuments();
  }
}
