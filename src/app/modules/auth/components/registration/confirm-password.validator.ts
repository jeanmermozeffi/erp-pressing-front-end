import { AbstractControl, FormControl } from '@angular/forms';

export class ConfirmPasswordValidator {
  /**
   * Check matching password with confirm password
   * @param control AbstractControl
   */
  static MatchPassword(control: AbstractControl<{
    password: FormControl<string>,
    confirmPassword: FormControl<string>
  }>): void {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('cPassword')?.value;

    if (password !== confirmPassword) {
      control.get('cPassword')?.setErrors({ ConfirmPassword: true });
    }
  }
}
