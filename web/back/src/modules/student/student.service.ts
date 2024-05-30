import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly StudentRepository: Repository<Student>,
  ) {}

  async create(Student: Student): Promise<Student> {
    return await this.StudentRepository.save(Student);
  }

  async findAll(): Promise<Student[]> {
    return await this.StudentRepository.find();
  }

  async findOne(uid: string): Promise<Student> {
    return await this.StudentRepository.findOne({ where: { uid } });
  }

  async update(uid: string, Student: Partial<Student>): Promise<void> {
    await this.StudentRepository.update(uid, Student);
  }

  async remove(uid: string): Promise<void> {
    await this.StudentRepository.delete(uid);
  }
}
