import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-template-demo',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './template-demo.component.html',
  styleUrls: ['./template-demo.component.css']
})
export class TemplateDemoComponent {
  title = 'Template-Driven Form Demo';
  username = '';
  email = '';
  password = '';
  role = '';
  gender = '';
  status = '';
  comments = '';
  submitted = false;
  submittedData: any = null;

  onSubmit(form: any) {
    this.submitted = true;
    if (form.valid) {
      this.submittedData = {
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.role,
        gender: this.gender,
        status: this.status,
        comments: this.comments
      };
    }
  }

  resetForm(form: any) {
    form.resetForm();
    this.submitted = false;
    this.submittedData = null;
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
