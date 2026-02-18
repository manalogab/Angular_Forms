import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

// Custom Validator: Phone number (PH format)
function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;
  const pattern = /^(\+63|0)9\d{9}$/;
  return pattern.test(value) ? null : { invalidPhone: true };
}

// Custom Validator: Must be at least 18
function ageValidator(control: AbstractControl): ValidationErrors | null {
  const value = parseInt(control.value);
  if (!value) return null;
  return value >= 18 && value <= 65 ? null : { invalidAge: true };
}

@Component({
  selector: 'app-custom-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})
export class CustomFormComponent {
  departments = ['Engineering', 'Marketing', 'Design', 'Finance', 'HR', 'Operations'];
  positions = ['Junior', 'Mid-level', 'Senior', 'Lead', 'Manager'];
  submittedData: any = null;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z ]+')]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z ]+')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, phoneValidator]],
      age: ['', [Validators.required, ageValidator]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0), Validators.max(40)]],
      skills: ['', Validators.required],
      availability: ['', Validators.required],
      coverLetter: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(1000)]],
    });
  }

  isInvalid(name: string): boolean {
    const c = this.form.get(name);
    return !!(c?.touched && c?.invalid);
  }

  isValid(name: string): boolean {
    const c = this.form.get(name);
    return !!(c?.touched && c?.valid);
  }

  getError(name: string): string {
    const ctrl = this.form.get(name);
    if (!ctrl?.errors) return '';
    const e = ctrl.errors;
    if (e['required']) return 'This field is required.';
    if (e['email']) return 'Enter a valid email address.';
    if (e['minlength']) return `Minimum ${e['minlength'].requiredLength} characters required.`;
    if (e['pattern']) return 'Invalid format.';
    if (e['invalidPhone']) return 'Enter a valid PH number (e.g. 09XXXXXXXXX).';
    if (e['invalidAge']) return 'Age must be between 18 and 65.';
    if (e['min']) return 'Value cannot be negative.';
    if (e['max']) return 'Maximum 40 years of experience.';
    return 'Invalid value.';
  }

  onSubmit() {
    if (this.form.valid) {
      this.submittedData = this.form.value;
    } else {
      this.form.markAllAsTouched();
    }
  }

  resetForm() {
    this.form.reset();
    this.submittedData = null;
  }

  get charCount() {
    return this.form.get('coverLetter')?.value?.length || 0;
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
