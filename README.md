# Angular_Forms

A full Angular 18 application demonstrating Template-Driven Forms, Reactive Forms, and a Custom Form with validation.

## Features

- **Template-Driven Form** – Uses `FormsModule`, `ngModel`, two-way binding, and built-in validators
- **Reactive Form** – Uses `ReactiveFormsModule`, `FormBuilder`, `FormGroup`, `FormControl`, and custom error helpers
- **Custom Form (Job Application)** – Uses Reactive Forms with custom validators (phone, age), dynamic fields, and a rich UI

All forms include:
- Username, Email, Password, Role (Select)
- Gender (Radio Buttons)
- Status: Permanent/Probationary
- Comments/Notes (Textarea)

---

## Getting Started

### Prerequisites
- Node.js v18+
- Angular CLI v18+

```bash
npm install -g @angular/cli
```

### Install & Run

```bash
npm install
ng serve
```

Navigate to `http://localhost:4200`

---

## Build for Production (Netlify)

```bash
ng build
```

The output will be in `dist/angular-forms/browser/`.

---

## Deploying to Netlify

### Option 1: Netlify CLI (Recommended)

```bash
npm install -g netlify-cli
ng build
netlify deploy --prod --dir dist/angular-forms/browser
```

### Option 2: Netlify Drag & Drop
1. Run `ng build`
2. Go to [netlify.com](https://netlify.com) → Sites → Drag & Drop
3. Drag the `dist/angular-forms/browser` folder

### Option 3: Connect GitHub
1. Push this repo to GitHub (repo name: `Template Driven` or `Reactive Form`)
2. On Netlify: New Site from Git → GitHub → Select repo
3. Build command: `ng build`
4. Publish directory: `dist/angular-forms/browser`
5. Deploy!

### ⚠️ Important: Angular Router Fix for Netlify

Create a file `src/_redirects` with:
```
/* /index.html 200
```

Add it to assets in `angular.json`:
```json
"assets": ["src/favicon.ico", "src/assets", "src/_redirects"]
```

---

## Project Structure

```
src/app/
├── nav/                    # Navigation bar
├── template-demo/          # Template-Driven Form
├── reactive-demo/          # Reactive Form
├── custom-form/            # Custom Job Application Form
├── app.component.ts
├── app.routes.ts
└── app.config.ts
```

---

## Reflection Answers

### Q1: How did working with both Template-Driven and Reactive Forms help you understand the different ways Angular manages user input and validation?

Working with both form types gave me a clear picture of the trade-offs in Angular's form management philosophy. Template-Driven Forms feel natural for simpler use cases — the logic lives in the HTML template using directives like `ngModel` and `required`, which makes the code easy to read for basic forms. However, as the form grows, the template becomes cluttered and harder to test.

Reactive Forms, on the other hand, shifted my thinking towards treating the form as a data model first. Defining `FormGroup` and `FormControl` instances in the component class meant the logic was centralized, typed, and easy to test in isolation. I especially appreciated the power of `Validators` — being able to compose multiple validators or write custom ones (like my `phoneValidator`) opened up much more control over the validation pipeline.

The key insight was understanding that both approaches share the same underlying concepts (validity states, dirty/touched tracking, error objects) — they just expose them differently. Template-Driven relies on directives and Angular's implicit tracking; Reactive makes everything explicit and synchronous.

### Q2: Which aspects of building Template-Driven and Reactive Forms did you find most challenging, and how did you overcome those challenges during development?

The most challenging part of **Template-Driven Forms** was debugging validation — since validation rules are embedded in the template as attributes, errors can be subtle. For example, correctly referencing `ngModel` via a template reference variable (`#field="ngModel"`) and then accessing `field.errors` required careful attention. I overcame this by methodically logging the form object and cross-referencing Angular's documentation on validator error keys.

For **Reactive Forms**, the trickiest part was writing **custom validators**. My `phoneValidator` and `ageValidator` needed to return the correct shape (`{ errorKey: true }` or `null`) and had to be attached to the `FormControl` correctly in `FormBuilder`. I also had to be careful about regex patterns — escaping backslashes for TypeScript strings (e.g., `\\d` instead of `\d`) caught me off guard initially.

Additionally, managing **validation UI state** (showing error messages only when a field is touched and invalid) required building clean helper methods (`isInvalid`, `isValid`, `getError`) to avoid repeating logic across the template. This made the code more maintainable and the user experience consistent.
"# Template-Driven" 
