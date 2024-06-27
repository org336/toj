import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AxiosService {
  constructor(private httpService: HttpService) {}

  get(url: string, params?: any): Promise<any> {
    //Observable对象的链式操作,通过firstValueFrom将Observable 转换成一个 Promise
    return firstValueFrom(
      this.httpService.get(url, { params }).pipe(
        map((response) => response.data),
        catchError((error) =>
          throwError(
            () =>
              new HttpException(
                error.response?.data || `请求【${url}】失败`,
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
              ),
          ),
        ),
      ),
    );
  }

  post(url: string, body: any, config?: any): Promise<any> {
    return firstValueFrom(
      this.httpService.post(url, body, config).pipe(
        map((response) => response.data),
        catchError((error) =>
          throwError(
            () =>
              new HttpException(
                error.response?.data || `请求【${url}】失败`,
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
              ),
          ),
        ),
      ),
    );
  }
}
