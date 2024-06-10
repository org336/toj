import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiCode } from '~/constants/enums/api-code.enums';
interface Response<T> {
  code: number;
  msg: string;
  data: T;
}
@Injectable()
export class ApiInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: ApiCode.SUCCESS,
          msg: 'success',
          data,
        };
      }),
    );
  }
}
