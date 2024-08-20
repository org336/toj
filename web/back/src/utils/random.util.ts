import { randomBytes } from 'crypto';
import moment from 'moment';
export default class RandomUtil {
  /**
   * 生成指定长度的随机字符串
   * @param length 字符串长度
   * @returns 随机字符串
   */
  static generateRandomString(length: number): string {
    return randomBytes(length).toString('hex').slice(0, length);
  }
  /**
   * 生成指定长度的随机文件名
   * @param length 文件名长度
   * @param extension 文件扩展名
   * @returns 随机文件名
   */
  static generateRandomFileName(length: number, extension: string): string {
    const randomString = RandomUtil.generateRandomString(length);
    return `${randomString}.${extension}`;
  }
  /**
   * 生成合理的11位长度的课程ID
   * 格式：YYYYMMDD + 2位随机字符串
   * @returns 课程ID
   */
  static generateCourseId(): string {
    const dateString = moment().format('YYYYMMDD');
    const randomString = RandomUtil.generateRandomString(3);
    return `${dateString}${randomString}`;
  }
  /**
   * 生成合理的12位长度的任务ID
   * 格式：YYYYMMDD + 4位随机字符串
   * @returns 任务ID
   */
  static generateTaskId(): string {
    const dateString = moment().format('YYYYMMDD');
    const randomString = RandomUtil.generateRandomString(4);
    return `${dateString}${randomString}`;
  }
  /**
   * 生成合理的10位长度的班级ID
   * 格式：YYYYMMDD + 3位随机字符串
   * @returns 班级ID
   */
  static generateClassId(): string {
    const dateString = moment().format('YYYYMMDD');
    const randomString = RandomUtil.generateRandomString(2);
    return `${dateString}${randomString}`;
  }
}
