import { Controller, Get, Post, Body, Query, Param, Put, Delete } from '@nestjs/common';
import { ClassService } from './class.service';
@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}
  @Post()
  async createClass(
    @Body()
    data: {
      name: string;
      major: string;
      total: number;
      permit_join: number;
      join_confirm: number;
      finish_mode: number;
    },
  ): Promise<void> {
    return await this.classService.createClass(data);
  }

  @Get()
  async getAllClass(): Promise<any> {
    return await this.classService.getAllClass();
  }
  @Get(':id/all')
  async getManyByClass(@Param('id') id: string): Promise<any> {
    return await this.classService.getStudentsByClass(id);
  }
  @Post(':id/all')
  async addManyToClass(
    @Param('id') class_id: string,
    @Body()
    data: Array<string>,
  ): Promise<any> {
    return await this.classService.addManyToClass(class_id, data);
  }
  @Delete(':id/all')
  async removeManyFromClass(
    @Param('id') class_id: string,
    @Body()
    data: Array<string>,
  ): Promise<any> {
    return await this.classService.removeManyFromClass(class_id, data);
  }
  @Put(':id')
  async updateClass(
    @Param('id') id: string,
    @Body()
    data: {
      name: string;
      major: string;
      total: number;
      permit_join: number;
      join_confirm: number;
      finish_mode: number;
    },
  ): Promise<void> {
    return await this.classService.updateClass(id, data);
  }

  @Delete(':id')
  async deleteClass(@Param('id') id: string): Promise<void> {
    return await this.classService.deleteClass(id);
  }
  @Delete(':id/:uid')
  async deleteStudent(@Param('id') id: string, @Param('uid') uid: string): Promise<void> {
    return await this.classService.deleteStudent(id, uid);
  }
}
