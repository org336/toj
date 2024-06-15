import { Module } from '@nestjs/common';
import { DatabaseProviders } from './database.providers';

@Module({
  imports: [DatabaseProviders],
})
export class DatabaseModule {}
