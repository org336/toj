import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AxiosService {
  private readonly logger = new Logger(AxiosService.name);

  constructor(private httpService: HttpService) {}

  async get(url: string, params?: any): Promise<any> {
    this.logger.log(
      `GET request to URL: ${url} with params: ${JSON.stringify(params)}`,
    );
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { params }).pipe(
          map((response) => response.data),
          catchError((error) => {
            this.handleError(error, url);
            return throwError(
              () =>
                new HttpException(
                  error.response?.data || `请求【${url}】失败`,
                  error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        ),
      );
      this.logger.log(`GET request to URL: ${url} succeeded`);
      return response;
    } catch (error) {
      this.logger.error(`GET request to URL: ${url} failed`, error.stack);
      throw error;
    }
  }

  async post(url: string, body: any, config?: any): Promise<any> {
    this.logger.log(
      `POST request to URL: ${url} with body: ${JSON.stringify(body)}`,
    );
    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, config).pipe(
          map((response) => response.data),
          catchError((error) => {
            this.handleError(error, url);
            return throwError(
              () =>
                new HttpException(
                  error.response?.data || `请求【${url}】失败`,
                  error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        ),
      );
      this.logger.log(`POST request to URL: ${url} succeeded`);
      return response;
    } catch (error) {
      this.logger.error(`POST request to URL: ${url} failed`, error.stack);
      throw error;
    }
  }

  private handleError(error: any, url: string) {
    this.logger.error(
      `Request to URL: ${url} failed with status: ${error.response?.status}`,
    );
    this.logger.error(
      `Error response data: ${JSON.stringify(error.response?.data)}`,
    );
  }
}
