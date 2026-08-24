import { Component } from "@angular/core";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "toggle",
  templateUrl: "./toggle.html",
  imports: [MatSlideToggleModule, MatIconModule],
})
export class Toggle {}
