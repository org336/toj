import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { ClassEntity, ClassToTask, ClassToUser } from './class.entity';
import { UserEntity } from '../user/user.entity';
import { TaskEntity } from '../task/task.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([ClassEntity, ClassToTask, ClassToUser, UserEntity, TaskEntity]),
  ],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
