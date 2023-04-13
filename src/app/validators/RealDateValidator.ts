import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function realDate(day: any, month: any, year: any): ValidatorFn {
    return (form: AbstractControl): { [key: string]: boolean } | null => {
        const dayValue = form.get(day)?.value;
        const monthValue = form.get(month)?.value;
        const yearValue = form.get(year)?.value;

        if(!dayValue || !monthValue){
            return {missing: true};
        }

        const daysPerMonth = {
            1: 30,
            2: 28,
            3: 31,
            4: 30,
            5: 31,
            6: 30,
            7: 31,
            8: 31,
            9: 30,
            10: 31,
            11: 30,
            12: 31
        }

        // reset errors here?
        // form.get(day)?.setErrors(null);
        // form.get(month)?.setErrors(null);
    
        if(monthValue === 2 && checkLeapYear(yearValue)){
            if(dayValue > 29){
                const error = {dateError: true};
                form.get(day)?.setErrors(error);
                form.get(month)?.setErrors(error);
                return error;
            } else {
                if (form.get('day')?.hasError('dateError') ) {
                    form.get('day')?.updateValueAndValidity()  
                }
    
                if (form.get('month')?.hasError('dateError') ) {
                    form.get('month')?.updateValueAndValidity()  
                }
                return null;
            }
        } else if (dayValue > daysPerMonth[monthValue as keyof Object]) {
            const error = {dateError: true};
            form.get(day)?.setErrors(error);
            form.get(month)?.setErrors(error);
            return error;
        } else {
            /*
            
            // or reset errors here?

            form.get(day)?.setErrors(null);
            form.get(month)?.setErrors(null);
            
            // reseting errors totally causes problem validating whether month is within mix and max bounds or not
            
            */

            if (form.get('day')?.hasError('dateError') ) {
                form.get('day')?.updateValueAndValidity()  
            }

            if (form.get('month')?.hasError('dateError') ) {
                form.get('month')?.updateValueAndValidity()  
            }
       
            return null;
        }

    };
}

function checkLeapYear(year: number) {
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
        return true;
    } else {
        return false;
    }
}
