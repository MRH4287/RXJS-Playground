import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";

export interface ApiResult<T> {
  success: boolean;
  data: T;
}

export class Api {
  public static echoCall(input: string): Observable<ApiResult<{value: string}>> {
    return Api.getResultRandom({
      value: input
    });
  }

  public static getResultRandom<T>(value: T): Observable<ApiResult<T>> {
    return of(null).pipe(
      delay(Math.random() * 1000),
      map(() => {
        const result = Math.random() > 0.3;
        return {
          success: result,
          data: value
        };
      })
    );
  }



}