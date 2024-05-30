import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async findAll(): Promise<Teacher[]> {
    return await this.teacherRepository.find();
  }

  async findOne(uid: string): Promise<Teacher> {
    return await this.teacherRepository.findOne({ where: { uid } });
  }

  async create(teacherData: Partial<Teacher>): Promise<Teacher> {
    const teacher = this.teacherRepository.create(teacherData);
    return await this.teacherRepository.save(teacher);
  }

  async update(uid: string, teacherData: Partial<Teacher>): Promise<Teacher> {
    await this.teacherRepository.update(uid, teacherData);
    return await this.teacherRepository.findOne({ where: { uid } });
  }

  async remove(uid: string): Promise<void> {
    await this.teacherRepository.delete(uid);
  }
}
