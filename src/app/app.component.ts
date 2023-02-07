import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationComponent } from '@app/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
