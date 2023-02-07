import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { RouteItems } from '@app/core/constants/route.constants';
import { ScreenSizeService } from '@app/core/services/screen-size.service';
import { NavigationMenuComponent } from '@app/navigation/menu/navigation-menu.component';
import { TranslocoModule } from '@ngneat/transloco';
import { RxEffects } from '@rx-angular/state/effects';
import { PushModule } from '@rx-angular/template/push';
import packageInfo from 'package.json';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    NavigationMenuComponent,
    PushModule,
    RouterModule,
    TranslocoModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [RxEffects],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  @ViewChild('drawer') public sidenav?: MatSidenav;

  public readonly mdDown$: Observable<boolean> = this.screenSizeService.mdDown$;
  public readonly routeItems = RouteItems;
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
