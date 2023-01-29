import { Injectable, OnDestroy } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { RxActionFactory } from '@rx-angular/state/actions';
import {
  distinctUntilChanged,
  EMPTY,
  filter,
  interval,
  map,
  merge,
  Observable,
  scan,
  startWith,
  switchMap,
  takeWhile,
  withLatestFrom,
} from 'rxjs';

import { Routine, RoutineStep } from './routine';

export interface RunnerState {
  countdown: number;
  currentStepIndex: number;
  playing: boolean;
  routine: Routine;
}

export interface RunnerActions {
  play: boolean;
  nextStep: void;
  previousStep: void;
  reset: void;
  setRoutine: Routine;
  setCoundown: number;
}

@Injectable()
export class Runner implements OnDestroy {
  public readonly routine$: Observable<Routine>;
  public readonly routineLength$: Observable<number>;

  public readonly countdown$: Observable<number>;
  public readonly countdownComplete$: Observable<void>;

  public readonly currentStepIndex$: Observable<number>;
  public readonly currentStep$: Observable<RoutineStep | undefined>;
  public readonly nextStep$: Observable<RoutineStep | undefined>;

  public readonly completed$: Observable<boolean>;

  private readonly factory = new RxActionFactory<RunnerActions>();
  private readonly state = new RxState<RunnerState>();

  private readonly actions = this.factory.create();

  constructor() {
    this.routine$ = this.state.select('routine');
    this.routineLength$ = this.routine$.pipe(map((routine: Routine) => routine.steps.length));

    this.countdown$ = this.state.select('countdown');
    this.countdownComplete$ = this.countdown$.pipe(
      filter((countdown: number) => countdown === 0),
      map(() => undefined)
    );

    this.currentStepIndex$ = this.state.select('currentStepIndex');
    this.currentStep$ = this.currentStepIndex$.pipe(
      withLatestFrom(this.routine$),
      map(([current, routine]: [number, Routine]) => routine.steps[current])
    );

    this.nextStep$ = this.currentStepIndex$.pipe(
      withLatestFrom(this.routine$),
      map(([current, routine]: [number, Routine]) => routine.steps[current + 1])
    );

    this.completed$ = this.state.select().pipe(
      map(
        (state: RunnerState) =>
          state.countdown === 0 && state.currentStepIndex === state.routine?.steps.length - 1
      ),
      distinctUntilChanged()
    );

    this.state.connect(
      'playing',
      merge(
        this.actions.play$.pipe(startWith(false)),
        this.actions.reset$.pipe(map(() => false))
      ).pipe(distinctUntilChanged())
    );
    this.state.connect('routine', this.actions.setRoutine$);

    this.state.hold(this.routine$, () => this.actions.reset());
    this.state.hold(this.completed$, (completed: boolean) => {
      if (completed) this.actions.play(false);
    });

    this.state.connect(
      'currentStepIndex',
      this.actions.reset$.pipe(
        switchMap(() =>
          merge(
            this.actions.nextStep$.pipe(
              withLatestFrom(this.currentStepIndex$, this.routineLength$),
              filter(([, current, length]: [void, number, number]) => current < length - 1),
              map(() => 1)
            ),
            this.actions.previousStep$.pipe(
              withLatestFrom(this.currentStepIndex$),
              filter(([, current]: [void, number]) => current > 0),
              map(() => -1)
            )
          ).pipe(
            startWith(0),
            scan((currentStep: number, change: number) => currentStep + change, 0)
          )
        ),
        distinctUntilChanged()
      )
    );

    this.state.connect(
      'countdown',
      merge(
        // Initial value
        this.actions.setCoundown$,

        // Countdown
        this.actions.setCoundown$.pipe(
          switchMap((setCountdown: number) =>
            this.state.select('playing').pipe(
              switchMap((playing: boolean) =>
                playing ? interval(1000).pipe(map(() => -1)) : EMPTY
              ),
              scan((acc: number, curr: number) => (curr ? curr + acc : acc), setCountdown),
              takeWhile((countdown: number) => countdown >= 0)
            )
          )
        )
      ).pipe(distinctUntilChanged())
    );

    this.state.hold(this.countdown$.pipe(filter((countdown: number) => countdown === 0)), () =>
      this.actions.nextStep()
    );

    this.state.hold(
      this.actions.reset$.pipe(switchMap(() => this.currentStep$)),
      (current: RoutineStep | undefined) =>
        this.actions.setCoundown(current?.duration.as('seconds') ?? 0)
    );
  }

  public set routine(routine: Routine) {
    this.actions.setRoutine(routine);
  }

  ngOnDestroy(): void {
    this.factory.ngOnDestroy();
    this.state.ngOnDestroy();
  }

  public play(): void {
    const routine = this.state.get('routine');
    if (routine && !routine.isEmpty) this.actions.play(true);
  }

  public pause(): void {
    this.actions.play(false);
  }

  public next(): void {
    if (this.state.get('currentStepIndex') === this.state.get('routine')?.steps.length - 1) {
      this.actions.setCoundown(0);
    } else {
      this.actions.nextStep();
    }
  }

  public previous(): void {
    if (this.state.get('currentStepIndex') === 0 && this.state.get('playing') === true) {
      this.actions.reset();
    } else {
      this.actions.previousStep();
    }
  }
}
