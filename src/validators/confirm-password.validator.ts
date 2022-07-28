import { Injectable }       from '@angular/core';
import { AbstractControl }  from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

@Injectable()
export class ConfirmPasswordValidator 
{
  constructor() {}

  public static passwordValidator(control : AbstractControl) : ValidationErrors | null
  {
    // NOTE Safety check
    const newPassword = control.get('newPassword');
    const confirmNewPassword = control.get('confirmNewPassword');

    if (!newPassword?.value || !confirmNewPassword?.value)
      return null;

    // NOTE Compare fields
    // const mStart  = moment(control.get('startDate').value);
    // const mEnd    = moment(control.get('endDate').value);
    // const isValid = mStart.isBefore(mEnd)
    
    const isValid = newPassword.value === confirmNewPassword.value;

    // NOTE Invalid
    if (!isValid)
      return { invalidComparaison : true };

    // NOTE Valid
    return null;
  }
}