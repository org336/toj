import { Injectable, HttpStatus } from '@nestjs/common';
import { RedisService } from '~/shared/redis/redis.service';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { ApiException } from '~/constants/exception/api.exception';
import { formatDateTime, parseDateTime } from '~/utils/timeformat.util';
@Injectable()
export class CommonService {
  constructor(private readonly redisService: RedisService) {}
}
