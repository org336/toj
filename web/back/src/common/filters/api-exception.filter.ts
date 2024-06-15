import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ApiException } from '~/constants/exception/api.exception';

@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    if (exception instanceof ApiException) {
      response.status(status).json({
        code: (exception as ApiException).gerErrorCode(),
        msg: (exception as ApiException).getErrorMessage(),
        path: request.url,
      });
    } else {
      // 处理非手动抛出的情况
      response.status(status).json((exception as HttpException).getResponse());
    }
  }
}
