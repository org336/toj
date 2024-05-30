import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Controller('users')
export class StudentController {
  constructor(private readonly StudentService: StudentService) {}

  @Post()
  async create(@Body() Student: Student): Promise<Student> {
    return await this.StudentService.create(Student);
  }

  @Get()
  async findAll(): Promise<Student[]> {
    return await this.StudentService.findAll();
  }

  @Get(':uid')
  async findOne(@Param('uid') uid: string): Promise<Student> {
    return await this.StudentService.findOne(uid);
  }

  @Put(':uid')
  async update(
    @Param('uid') uid: string,
    @Body() Student: Partial<Student>,
  ): Promise<void> {
    await this.StudentService.update(uid, Student);
  }

  @Delete(':uid')
  async delete(@Param('uid') uid: string): Promise<void> {
    await this.StudentService.remove(uid);
  }
}
