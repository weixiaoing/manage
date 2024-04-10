import { request } from './axios'

/**
 * @description -封装User类型的接口方法
 */
export class UserService {
  // 模块一
  /**
   * @description 用户登录
   * @param {string} username - 用户名
   * @return {HttpResponse} result
   */
  // 登录
  static async login(params) {
    // 接口一
    return request('/user/login', params, 'post')
  }
  // 获取用户信息
  static async getInfo(params) {
    return request('/user/info', params, 'get')
  }
  // 登出
  static async logout() {
    return request('/user/login', {}, 'get')
  }
}
// 关键词接口
export class KeyService {
  // 获取关键词列表
  static async getKeys(params) {
    return request('/keyword/admin/list', params, 'post')
  }
  // 获取关键词详情
  static async getDetail(id) {
    return request(`/keyword/${id}`, {}, 'get')
  }
  // 获取关键词评价
  static async audit(params) {
    return request('/keyword/audit', params, 'post')
  }
  static async logOut() {
    return request('/user/logout', {}, 'post')
  }
}
// 公告接口
export class NoticeService {
  // 添加公告
  static async noticeCreate(params) {
    return request('/notice/publish', params, 'post')
  }
  // 更新公告
  static async noticeUpdate(params) {
    return request('/notice/update', params, 'post')
  }
  // 公告删除
  static async noticeDelete({ id }) {
    return request(`/notice/delete/${id}`, {}, 'delete')
  }
  // 获取公告列表
  static async noticeGet() {
    return request('/notice/list', {}, 'get')
  }
}
