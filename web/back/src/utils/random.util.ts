import { randomBytes } from 'crypto';

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
}
