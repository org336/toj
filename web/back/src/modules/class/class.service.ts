import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, DataSource } from 'typeorm';
import { ClassEntity, ClassToTask, ClassToUser } from './class.entity';
import RandomUtil from '~/utils/random.util';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { ApiException } from '~/constants/exception/api.exception';
import { UserEntity } from '../user/user.entity';
import { ClassToUserDto } from '../user/user.dto';
import { log } from 'console';
@Injectable()
export class ClassService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ClassEntity)
    private readonly classRepository: Repository<ClassEntity>,
    @InjectRepository(ClassToTask)
    private readonly classToTaskRepository: Repository<ClassToTask>,
    @InjectRepository(ClassToUser)
    private readonly classToUserRepository: Repository<ClassToUser>,
  ) {}
  async createClass(data: any): Promise<void> {
    const id = RandomUtil.generateClassId();
    const { name, major, total, permit_join, join_confirm, finish_mode } = data;
    const newClass = this.classRepository.create({
      id,
      major,
      name,
      total,
      permit_join,
      join_confirm,
      finish_mode,
    });
    const result = await this.classRepository
      .createQueryBuilder()
      .insert()
      .values(newClass)
      .execute();
    if (!result) {
      throw new ApiException('创建新班级失败', ApiCode.BUSINESS_ERROR, 400);
    }
  }
  async getAllClass(): Promise<ClassEntity[]> {
    const classes = await this.classRepository.createQueryBuilder().getMany();
    if (!classes) {
      throw new ApiException('未找到任何班级', ApiCode.NOT_FOUND, 400);
    }
    return classes;
  }
  //获取对应班级的所有学生
  async getStudentsByClass(class_id: string): Promise<any[]> {
    const users = await this.classToUserRepository
      .createQueryBuilder()
      .innerJoin(UserEntity, 'user', 'user.uid = user_uid')
      .select([
        'user.uid',
        'user.user_id',
        'user.email',
        'user.real_name',
        'class_id',
        'create_time',
      ])
      .where('class_id = :class_id', { class_id })
      .getRawMany();
    if (!users || users.length === 0) {
      throw new ApiException('当前班级下没有学生', ApiCode.NOT_FOUND, 400);
    }
    return users;
  }
  async updateClass(id: string, data: any): Promise<void> {
    const { name, major, total, permit_join, join_confirm, finish_mode } = data;
    const result = await this.dataSource
      .createQueryBuilder()
      .update(ClassEntity)
      .set({ name, major, total, permit_join, join_confirm, finish_mode })
      .where('id = :id', { id })
      .execute();
    if (!result.affected) {
      throw new ApiException('更新班级信息失败', ApiCode.BUSINESS_ERROR, 400);
    }
  }
  // 为班级添加成员
  async addManyToClass(class_id: string, data: Array<string>): Promise<void> {
    const values = data.map((user_uid) => ({ class_id, user_uid }));
    const result = await this.classToUserRepository
      .createQueryBuilder()
      .insert()
      .values(values)
      .execute();
    if (!result || result.raw.affectedRows === 0) {
      throw new ApiException('添加学生到班级失败', ApiCode.BUSINESS_ERROR, 400);
    }
  }
  // 从班级中移除成员
  async removeManyFromClass(class_id: string, data: any): Promise<void> {
    const result = await this.classToUserRepository
      .createQueryBuilder()
      .delete()
      .where('class_id = :class_id', { class_id })
      .andWhere('user_uid IN (:...user_uids)', { user_uids: data })
      .execute();
    if (!result || result.affected === 0) {
      throw new ApiException('从班级中移除学生失败', ApiCode.BUSINESS_ERROR, 400);
    }
  }
  // 删除班级
  async deleteClass(id: string): Promise<void> {
    const result = await this.classRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
    if (!result.affected) {
      throw new ApiException('删除班级失败', ApiCode.BUSINESS_ERROR, 400);
    }
  }
  // 删除班级成员
  async deleteStudent(id: string, user_uid: string): Promise<void> {
    const result = await this.classToUserRepository
      .createQueryBuilder()
      .delete()
      .where('user_uid = :user_uid', { user_uid })
      .andWhere('class_id = :class_id', { class_id: id })
      .execute();
    if (!result.affected) {
      throw new ApiException('删除班级成员失败', ApiCode.BUSINESS_ERROR, 400);
    }
  }
}
