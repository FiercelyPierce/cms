import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode = false;

  constructor(
    private DocumentService: DocumentService,
    private Router: Router,
    private ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      if (id === null || id === undefined) {
        this.editMode = false;
        return;
      }

      this.originalDocument = this.DocumentService.getDocument(id);
      if (this.originalDocument === null || this.originalDocument === undefined) {
        return;
      }

      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newDocument = new Document(null, value.name, value.description, value.url, null);

    if (this.editMode === true) {
      this.DocumentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.DocumentService.addDocument(newDocument);
    }

    this.Router.navigate(['/documents']);
  }

  onCancel() {
    this.Router.navigate(['/documents']);
  }
}
