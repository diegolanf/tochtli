import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { NavigationMenuItems } from '@app/navigation/navigation-menu-items.constants';
import { SharedModule } from '@app/shared/shared.module';
import packageInfo from 'package.json';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, RouterModule, SharedModule],
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMenuComponent {
  public readonly navigationMenuItems = NavigationMenuItems;
  public readonly version: string = packageInfo.version;
}
