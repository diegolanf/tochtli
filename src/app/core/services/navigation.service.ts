import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { RxActionFactory } from '@rx-angular/state/actions';
import { filter, map, Observable, of, startWith, tap, withLatestFrom } from 'rxjs';

interface NavigationServiceState {
  history: string[];
}

interface NavigationServiceActions {
  back: void;
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  public readonly history$: Observable<string[]>;
  public readonly historyLength$: Observable<number>;
  public readonly last$: Observable<string | undefined>;
  public readonly back$: Observable<void>;

  private readonly actions = new RxActionFactory<NavigationServiceActions>().create();
  private readonly state = new RxState<NavigationServiceState>();

  constructor(private readonly location: Location, private readonly router: Router) {
    this.back$ = this.actions.back$;
    this.history$ = this.state.select('history');
    this.historyLength$ = this.history$.pipe(map((history: string[]) => history.length));
    this.last$ = this.history$.pipe(map((history: string[]) => history[history.length - 1]));

    this.state.connect(
      this.router.events.pipe(
        filter((event: unknown): event is NavigationEnd => event instanceof NavigationEnd),
        map((navigationEnd: NavigationEnd) => navigationEnd.urlAfterRedirects),
        withLatestFrom(this.last$.pipe(startWith(undefined))),
        filter(([url, last]: [string, string | undefined]) => last !== url)
      ),
      (oldState: NavigationServiceState, [url]: [string, string | undefined]) => ({
        history: oldState?.history !== undefined ? [...oldState.history, url] : [url],
      })
    );

    this.state.connect(
      this.back$.pipe(
        withLatestFrom(this.historyLength$.pipe(startWith(undefined))),
        filter(([, length]: [void, number | undefined]) => length !== undefined && length > 1),
        tap(() => this.location.back())
      ),
      (oldState: NavigationServiceState) => ({
        history: oldState.history.slice(0, -1),
      })
    );
  }

  public back(): void {
    this.actions.back();
  }

  public init(): Observable<void> {
    return of();
  }
}
