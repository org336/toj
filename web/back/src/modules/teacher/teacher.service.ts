import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherEntity } from './teacher.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherEntity)
    private TeacherEntityRepository: Repository<TeacherEntity>,
  ) {}

  async findAll(): Promise<TeacherEntity[]> {
    return await this.TeacherEntityRepository.find();
  }

  async findOne(uid: string): Promise<TeacherEntity> {
    return await this.TeacherEntityRepository.findOne({ where: { uid } });
  }

  async create(
    TeacherEntityData: Partial<TeacherEntity>,
  ): Promise<TeacherEntity> {
    const TeacherEntity =
      this.TeacherEntityRepository.create(TeacherEntityData);
    return await this.TeacherEntityRepository.save(TeacherEntity);
  }

  async update(
    uid: string,
    TeacherEntityData: Partial<TeacherEntity>,
  ): Promise<TeacherEntity> {
    await this.TeacherEntityRepository.update(uid, TeacherEntityData);
    return await this.TeacherEntityRepository.findOne({ where: { uid } });
  }

  async remove(uid: string): Promise<void> {
    await this.TeacherEntityRepository.delete(uid);
  }
}
