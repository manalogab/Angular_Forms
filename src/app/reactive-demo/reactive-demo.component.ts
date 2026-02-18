import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-reactive-demo',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './reactive-demo.component.html',
  styleUrls: ['./reactive-demo.component.css']
})
export class ReactiveDemoComponent {
  roles = ['Admin', 'User', 'Guest'];
  submittedData: any = null;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9_]+')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')]],
      role: ['Admin', Validators.required],
      gender: ['', Validators.required],
      status: ['', Validators.required],
      comments: ['', Validators.maxLength(300)],
    });
  }

  isInvalid(name: string): boolean {
    const control = this.form.get(name);
    return !!(control?.touched && control?.invalid);
  }

  isValid(name: string): boolean {
    const control = this.form.get(name);
    return !!(control?.touched && control?.valid);
  }

  getError(name: string): string {
    const ctrl = this.form.get(name);
    if (!ctrl?.errors) return '';
    if (ctrl.errors['required']) return `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    if (ctrl.errors['email']) return 'Enter a valid email address.';
    if (ctrl.errors['minlength']) return `Minimum ${ctrl.errors['minlength'].requiredLength} characters required.`;
    if (ctrl.errors['pattern']) {
      if (name === 'password') return 'Must include uppercase, lowercase, and a number.';
      if (name === 'username') return 'Only letters, numbers, and underscores allowed.';
    }
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
    this.form.reset({ role: 'Admin' });
    this.submittedData = null;
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
