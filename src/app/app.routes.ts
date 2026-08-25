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
  },
  {
    path: 'buttons',
    component: Buttons,
  },
  {
    path: 'button-toggle',
    component: ButtonToggle,
  },
  {
    path: 'form-field',
    component: FormField,
  },
  {
    path: 'chips',
    component: Chips,
  },
  {
    path: 'slider',
    component: Slider,
  },
  {
    path: 'toggle',
    component: Toggle,
  },
  {
    path: 'progress-loader',
    component: ProgressBar,
  },
  {
    path: 'checkbox',
    component: Checkbox,
  },
  {
    path: 'css',
    component: CssOverrides,
  },
];
