import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'documents';

  switchView(selectedFeature: string) {
    this.title = selectedFeature;
  }
}
