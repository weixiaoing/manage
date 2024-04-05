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
  static async login(params) {
    // 接口一
    return request('/user/login', params, 'post')
  }
  static async getInfo(params) {
    return request('/user/info', params, 'get')
  }
  static async logout() {
    return request('/user/login', {}, 'get')
  }
}

export class KeyService {
  static async getKeys(params) {
    return request('/keyword/admin/list', params, 'post')
  }
  static async getDetail(id) {
    return request(`/keyword/${id}`, {}, 'get')
  }
  static async audit(params) {
    return request('/keyword/audit', params, 'post')
  }
  static async logOut() {
    return request('/user/logout', {}, 'post')
  }
}

export class NoticeService {
  static async noticeCreate(params) {
    return request('/notice/publish', params, 'post')
  }

  static async noticeUpdate(params) {
    return request('/notice/update', params, 'post')
  }

  static async noticeDelete({ id }) {
    return request(`/notice/delete/${id}`, {}, 'delete')
  }
  static async noticeGet() {
    return request('/notice/list', {}, 'get')
  }
}
