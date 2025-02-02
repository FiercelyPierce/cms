import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Document } from '../../document.model';

@Component({
  selector: 'cms-document-item',
  standalone: false,
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent {
  @Input() document: Document;
  @Output() selectedDocument = new EventEmitter<void>();

  onSelected() {
    this.selectedDocument.emit();
  }
}
