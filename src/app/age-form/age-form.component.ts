import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { realDate } from '../validators/RealDateValidator';
import intervalToDuration from 'date-fns/intervalToDuration';

@Component({
  selector: 'app-age-form',
  templateUrl: './age-form.component.html',
  styleUrls: ['./age-form.component.css'],
})
export class AgeFormComponent {
  ageForm = new FormGroup({
    day: new FormControl('', [Validators.required, Validators.min(1), Validators.max(31)]),
    month: new FormControl('', [Validators.required, Validators.min(1), Validators.max(12)]),
    year: new FormControl('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())])
  }, { validators: realDate('day', 'month', 'year') });

  // make variables for new calculated dates and use those variables in the html
  yearsPassed: number | undefined = undefined;
  monthsPassed: number | undefined = undefined;
  daysPassed: number | undefined = undefined;

  onSubmit() {

    if (this.ageForm.valid) {
      const year = Number(this.ageForm.value.year);
      const month = Number(this.ageForm.value.month);
      const day = Number(this.ageForm.value.day);

      // new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)

      /*
      intervalToDuration({
        start: new Date(1929, 0, 15, 12, 0, 0),
        end: new Date(1968, 3, 4, 19, 5, 0)
      })
      */
      // => { years: 39, months: 2, days: 20, hours: 7, minutes: 5, seconds: 0 }

      const { years, months, days } = intervalToDuration({
        start: new Date(year, (month - 1), day, 0, 0, 0),
        end: new Date()
      })

      this.yearsPassed = years;
      this.monthsPassed = months;
      this.daysPassed = days;
    }
  }

}
