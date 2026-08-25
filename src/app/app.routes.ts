import { Routes } from '@angular/router';
import { AllComponents } from './components/all-components';
import { ButtonToggle } from './components/button-toggle/button-toggle';
import { Buttons } from './components/button/button';
import { Checkbox } from './components/checkbox/checkbox';
import { Chips } from './components/chips/chips';
import { CssOverrides } from './components/css-overrides/css-overrides';
import { FormField } from './components/form-field/form-field';
import { ProgressBar } from './components/progress-bar/progress-bar';
import { Slider } from './components/slider/slider';
import { Toggle } from './components/toggle/toggle';

export const routes: Routes = [
  {
    path: '',
    component: AllComponents,
    title: 'Angular Material Enhanced - Material 3 Component Overrides & Sizing',
  },
  {
    path: 'buttons',
    component: Buttons,
    title: 'Buttons - Angular Material Enhanced',
  },
  {
    path: 'button-toggle',
    component: ButtonToggle,
    title: 'Button Toggle - Angular Material Enhanced',
  },
  {
    path: 'form-field',
    component: FormField,
    title: 'Form Field & Radios - Angular Material Enhanced',
  },
  {
    path: 'chips',
    component: Chips,
    title: 'Chips - Angular Material Enhanced',
  },
  {
    path: 'slider',
    component: Slider,
    title: 'Slider - Angular Material Enhanced',
  },
  {
    path: 'toggle',
    component: Toggle,
    title: 'Slide Toggle - Angular Material Enhanced',
  },
  {
    path: 'progress-loader',
    component: ProgressBar,
    title: 'Progress Bar - Angular Material Enhanced',
  },
  {
    path: 'checkbox',
    component: Checkbox,
    title: 'Checkbox - Angular Material Enhanced',
  },
  {
    path: 'css',
    component: CssOverrides,
    title: 'CSS & SCSS Overrides - Angular Material Enhanced',
  },
];
