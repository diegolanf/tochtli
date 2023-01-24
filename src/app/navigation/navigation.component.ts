import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ScreenSizeService } from '@app/core/services/screen-size.service';
import { NavigationMenuComponent } from '@app/navigation/menu/navigation-menu.component';
import { NavigationMenuItems } from '@app/navigation/navigation-menu-items.constants';
import { SharedModule } from '@app/shared/shared.module';
import { RxEffects } from '@rx-angular/state/effects';
import { PushModule } from '@rx-angular/template/push';
import packageInfo from 'package.json';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    NavigationMenuComponent,
    PushModule,
    RouterModule,
    SharedModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [RxEffects],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  @ViewChild('drawer') public sidenav?: MatSidenav;

  public readonly mdDown$: Observable<boolean> = this.screenSizeService.mdDown$;
  public readonly navigationMenuItems = NavigationMenuItems;
  public readonly version: string = packageInfo.version;

  constructor(
    private readonly effects: RxEffects,
    private readonly screenSizeService: ScreenSizeService
  ) {
    this.effects.register(this.mdDown$, (mdDown: boolean) => {
      if (!mdDown && this.sidenav?.opened) this.sidenav?.close();
    });
  }
}
