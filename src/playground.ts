import { BehaviorSubject, combineLatest, forkJoin, fromEvent, merge, Observable, of, Subject, timer } from "rxjs";
import {  catchError, debounceTime, delay, map, mergeMap, switchMap, take, takeUntil, tap } from "rxjs/operators";
import { Api } from "./fakeApi";

/**
 * Used to control the PlayGround Elements
 */
export class Playground {

  public static getButton(): HTMLButtonElement {
    return <HTMLButtonElement>document.getElementById('button');
  }

  private static _buttonEvent: Observable<MouseEvent>;

  public static getButtonEvent(): Observable<MouseEvent> {
    if (!!this._buttonEvent) {
      return this._buttonEvent;
    }


    const button = this.getButton();
    if (!button) {
      return of(null);
    }

    this._buttonEvent = <Observable<MouseEvent>>fromEvent(button, 'click');
    return this._buttonEvent;
  }

  public static setResult(value: any, append = true) {
    const element = document.getElementById('result');
    const input = typeof(value) === 'object' ? JSON.stringify(value) : String(value);
    const lines = element.innerText.split('\n').length;
    if (lines > 8) {
      element.innerText = '';
    }

    if (!append) {
      element.innerText = input;
    } else {
      element.innerText += input + '\n';
    }

    console.log(value);
  }


  public static lightIcon<T>(icon: string | number): (input: Observable<T>) => Observable<T> {
    return (input) => {
      return input.pipe(
        tap(_ => {
          Playground.lightIconImediate(icon);
        })
      );
    };
  }

  public static lightIconImediate(icon: string | number) {
    if (typeof(icon) === 'number') {
      icon = `icon${icon}`;
    }

    this.setIcon(<string>icon, true);

    setTimeout(() => {
      this.setIcon(<string>icon, false);
    }, 200);
  }

  private static setIcon(icon: string, state: boolean) {
    const iconElement = <HTMLDivElement>document.getElementById(icon);
    this.setClass(iconElement, 'trigger', state);
  }

  private static setClass(element: HTMLDivElement, cssClass: string, state: boolean) {
    if (!element) {
      return;
    }
    const isSet = element.classList.contains(cssClass);
    if (state && !isSet){
      element.classList.add(cssClass);
    } else if (!state && !!isSet) {
      element.classList.remove(cssClass);
    }
  }

  public static enableIcon(count: number) {
    const icons = document.querySelectorAll(".icon");
    icons.forEach((icon: HTMLDivElement) => this.setClass(icon, 'hidden', true));

    for (let i = 1; i <= count; i++) {
      const icon = <HTMLDivElement>document.getElementById('icon' + i);
      this.setClass(icon, 'hidden', false);
    }
  }

  public static makePublic() {
    const win = <any>window;

    win.Playground = Playground;
    win.Api = Api;

    win.Subject = Subject;
    win.Observable = Observable;
    win.BehaviorSubject = BehaviorSubject;
    win.tap = tap;
    win.map = map;
    win.of = of;
    win.timer = timer;
    win.mergeMap = mergeMap;
    win.switchMap = switchMap;
    win.merge = merge;
    win.forkJoin = forkJoin;
    win.combineLatest = combineLatest;
    win.delay = delay;
    win.debounceTime = debounceTime;
    win.takeUntil = takeUntil;
    win.take = take;
    win.catchError = catchError;
  }


}