// src/config/config.service.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get secretKey(): string {
    return this.configService.get<string>('SECRET_KEY');
  }

  get dbConnectionString(): string {
    return this.configService.get<string>('DB_CONNECTION_STRING');
  }
}
