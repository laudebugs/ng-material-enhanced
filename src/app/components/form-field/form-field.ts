import { Component, signal } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatTimepickerModule } from "@angular/material/timepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: "form-field",
  templateUrl: "./form-field.html",
  providers: [provideNativeDateAdapter()],
  imports: [MatTimepickerModule, MatCheckboxModule, MatRadioModule, MatFormFieldModule,MatSelectModule, MatInputModule, MatButtonModule, FormsModule, MatIconModule],
  styles: [`
      :host {
        display: flex;
        flex-flow: wrap;
        gap: 0.5em;
      }
    `]
})
export class FormField {
  firstName = signal("Ininda");
  lastName = signal("Ininda");

  passwordType = signal("text");
  password = signal("ancient rome");
  country = signal("");
  school = signal("Mang'u High School");

  togglePasswordType() {
    this.passwordType.set(this.passwordType() === "password" ? "text" : "password");
  }

   foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  favoriteSeason = signal('');
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  checked = signal(false);
}
