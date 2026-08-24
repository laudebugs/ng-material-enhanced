import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatSliderModule } from "@angular/material/slider";

@Component({
  selector: "slider",
  templateUrl: "./slider.html",
  imports: [MatSliderModule, FormsModule],
  styles: [

    `
     :host {
      display: flex;
      // justify-content: center;
      width: calc(100% - 4em - 2px);
      height: calc(100% - 4em - 2px);
      align-items: center;
      border: 1px solid black;
      flex-direction: column;
    }
    mat-slider {
      // top: 50%;
      width: 50%;
      margin: 1em;
    }`
  ]
})
export class Slider {}
