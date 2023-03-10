import { Injectable, OnDestroy } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { RxActionFactory } from '@rx-angular/state/actions';
import { Howl } from 'howler';
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
  restartStep: void;
  jumpToStep: number;
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
  public readonly progress$: Observable<number>;

  public readonly currentStepIndex$: Observable<number>;
  public readonly currentStep$: Observable<RoutineStep | undefined>;
  public readonly nextStep$: Observable<RoutineStep | undefined>;

  public readonly initialState$: Observable<boolean>;
  public readonly playing$: Observable<boolean>;
  public readonly completed$: Observable<boolean>;

  private readonly factory = new RxActionFactory<RunnerActions>();
  private readonly state = new RxState<RunnerState>();
  private readonly state$: Observable<RunnerState> = this.state.select();

  private soundFile: 'short-pluck' | 'micro-pulse' | 'dirty-pulse' = 'dirty-pulse';
  private volume = 0.5;

  private ready = new Howl({
    src: [`assets/sounds/${this.soundFile}-ready.m4a`],
    volume: this.volume,
  });

  private go = new Howl({
    src: [`assets/sounds/${this.soundFile}-go.m4a`],
    volume: this.volume,
  });

  private readonly actions = this.factory.create();

  constructor() {
    this.routine$ = this.state.select('routine');
    this.routineLength$ = this.routine$.pipe(map((routine: Routine) => routine.steps.length));

    this.countdown$ = this.state.select('countdown');
    this.countdownComplete$ = this.countdown$.pipe(
      filter((countdown: number) => countdown === 0),
      map(() => undefined)
    );

    this.progress$ = this.state$.pipe(
      map(
        (state: RunnerState) =>
          ((state.routine.steps
            .filter((_: RoutineStep, index: number) => index <= state.currentStepIndex)
            .reduce((acc: number, step: RoutineStep) => acc + step.duration.as('seconds'), 0) -
            state.countdown) /
            state.routine.metadata.steps.duration.as('seconds')) *
          100
      ),
      distinctUntilChanged()
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

    this.initialState$ = this.state$.pipe(
      map(
        (state: RunnerState) =>
          state.countdown === state.routine.steps[0]?.duration.as('seconds') &&
          state.currentStepIndex === 0 &&
          state.playing === false
      ),
      distinctUntilChanged()
    );

    this.playing$ = this.state.select('playing');
    this.completed$ = this.state$.pipe(
      map(
        (state: RunnerState) =>
          state.countdown === 0 &&
          state.currentStepIndex === state.routine?.steps.length - 1 &&
          state.playing === false
      ),
      distinctUntilChanged()
    );

    this.state.connect(
      'playing',
      merge(
        this.actions.play$.pipe(
          withLatestFrom(this.completed$),
          filter(([, completed]: [boolean, boolean]) => !completed),
          map(([play]: [boolean, boolean]) => play),
          startWith(false)
        ),
        this.actions.reset$.pipe(map(() => false))
      ).pipe(distinctUntilChanged())
    );
    this.state.connect('routine', this.actions.setRoutine$);

    this.state.hold(this.routine$, () => this.actions.reset());

    this.state.connect(
      'currentStepIndex',
      merge(
        this.actions.jumpToStep$,
        this.actions.reset$.pipe(
          map(() => 0),
          startWith(0)
        )
      ).pipe(
        switchMap((jumpToStep: number) =>
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
            scan((currentStep: number, change: number) => currentStep + change, jumpToStep)
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
            this.playing$.pipe(
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

    this.state.hold(
      this.countdown$.pipe(filter((countdown: number) => countdown <= 3 && countdown !== 0)),
      () => this.ready.play()
    );

    this.state.hold(
      this.countdownComplete$.pipe(withLatestFrom(this.state$)),
      ([, state]: [void, RunnerState]) => {
        if (state.currentStepIndex < state.routine.steps.length - 1) {
          this.go.play();
          this.actions.nextStep();
        } else {
          this.actions.play(false);
        }
      }
    );

    this.state.hold(
      merge(this.actions.reset$, this.actions.restartStep$).pipe(
        switchMap(() => this.currentStep$)
      ),
      (current: RoutineStep | undefined) =>
        this.actions.setCoundown(current?.duration.as('seconds') ?? 0)
    );
  }

  private get currentStepDuration(): number | undefined {
    return this.state
      .get('routine')
      ?.steps[this.state.get('currentStepIndex')].duration.as('seconds');
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
    if (this.state.get('currentStepIndex') === 0) {
      this.actions.reset();
    } else {
      if (this.currentStepDuration !== this.state.get('countdown')) {
        this.actions.restartStep();
      } else {
        this.actions.previousStep();
      }
    }
  }

  public jumpToStep(step: number): void {
    if (step < this.state.get('routine').steps.length) this.actions.jumpToStep(step);
  }

  public setCountdown(countdown: number): void {
    if (this.currentStepDuration && countdown <= this.currentStepDuration)
      this.actions.setCoundown(countdown);
  }
}
