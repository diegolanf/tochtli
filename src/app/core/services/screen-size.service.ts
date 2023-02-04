import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { filter, map, Observable } from 'rxjs';

export enum ScreenSize {
  XSmall = 1,
  Small = 2,
  Medium = 3,
  Large = 4,
  XLarge = 5,
}

export const ScreenSizes = Object.values(ScreenSize).filter(
  (screenSize: string | ScreenSize) => typeof screenSize !== 'string'
) as ScreenSize[];

export const ScreenSizeBreakpointMap: { [key in ScreenSize]: string } = {
  1: Breakpoints.XSmall,
  2: Breakpoints.Small,
  3: Breakpoints.Medium,
  4: Breakpoints.Large,
  5: Breakpoints.XLarge,
};

export interface ScreenSizeServiceState {
  screenSize: ScreenSize;
  xsDown: boolean;
  xsUp: boolean;
  smDown: boolean;
  smUp: boolean;
  mdDown: boolean;
  mdUp: boolean;
  lgDown: boolean;
  lgUp: boolean;
  xlDown: boolean;
  xlUp: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  public readonly state$: Observable<ScreenSizeServiceState>;
  public readonly screenSize$: Observable<ScreenSize>;

  public readonly xsDown$: Observable<boolean>;
  public readonly xsUp$: Observable<boolean>;
  public readonly smDown$: Observable<boolean>;
  public readonly smUp$: Observable<boolean>;
  public readonly mdDown$: Observable<boolean>;
  public readonly mdUp$: Observable<boolean>;
  public readonly lgDown$: Observable<boolean>;
  public readonly lgUp$: Observable<boolean>;
  public readonly xlDown$: Observable<boolean>;
  public readonly xlUp$: Observable<boolean>;

  protected readonly state = new RxState<ScreenSizeServiceState>();

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.state$ = this.state.select();
    this.screenSize$ = this.state.select('screenSize');

    this.xsDown$ = this.state.select('xsDown');
    this.xsUp$ = this.state.select('xsUp');
    this.smDown$ = this.state.select('smDown');
    this.smUp$ = this.state.select('smUp');
    this.mdDown$ = this.state.select('mdDown');
    this.mdUp$ = this.state.select('mdUp');
    this.lgDown$ = this.state.select('lgDown');
    this.lgUp$ = this.state.select('lgUp');
    this.xlDown$ = this.state.select('xlDown');
    this.xlUp$ = this.state.select('xlUp');

    this.state.connect(
      this.breakpointObserver
        .observe([
          Breakpoints.XSmall,
          Breakpoints.Small,
          Breakpoints.Medium,
          Breakpoints.Large,
          Breakpoints.XLarge,
        ])
        .pipe(
          map((state: BreakpointState) =>
            ScreenSizes.find(
              (screenSize: ScreenSize) => state.breakpoints[ScreenSizeBreakpointMap[screenSize]]
            )
          ),
          filter((screenSize?: ScreenSize): screenSize is ScreenSize => screenSize !== undefined),
          map((screenSize: ScreenSize) => ({
            screenSize,
            xsDown: screenSize === ScreenSize.XSmall,
            xsUp: screenSize >= ScreenSize.XSmall,
            smDown: screenSize < ScreenSize.Small,
            smUp: screenSize >= ScreenSize.Small,
            mdDown: screenSize < ScreenSize.Medium,
            mdUp: screenSize >= ScreenSize.Medium,
            lgDown: screenSize < ScreenSize.Large,
            lgUp: screenSize >= ScreenSize.Large,
            xlDown: screenSize < ScreenSize.XLarge,
            xlUp: screenSize === ScreenSize.XLarge,
          }))
        )
    );
  }
}
