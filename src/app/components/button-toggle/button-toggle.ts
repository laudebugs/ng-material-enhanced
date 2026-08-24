import { Component, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'button-toggle',
  imports: [MatButtonToggleModule, MatIconModule],
  templateUrl: './button-toggle.html',
})
export class ButtonToggle {
}
