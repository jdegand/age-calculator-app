import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  @Input() daysPassed:any;
  @Input() monthsPassed:any;
  @Input() yearsPassed:any;
  @Input() ageForm:any;
  @Input() localForm:any;
}
