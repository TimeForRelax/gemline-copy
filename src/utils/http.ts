import { LsValueType } from '@enums/index';
import axios from 'axios';
import { cs, ls } from '@utils/index';

export enum ApiCallType {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export class HttpService {
  static source = axios.CancelToken.source();
  static token = ls.get(LsValueType.token);

  static getToken() {
    return ls.get(LsValueType.token);
  }

  static setToken(token: string) {
    ls.set(LsValueType.token, token);
    HttpService.token = token;
  }

  static removeToken() {
    ls.remove(LsValueType.token);

    cs.remove(LsValueType.token);

    HttpService.token = null;
  }

  static get(url: string, options?: any) {
    return HttpService.makeRequest({
      url,
      method: 'get',
      ...options,
    });
  }

  static post(url: string, data: any, options?: any) {
    return HttpService.makeRequest({
      url,
      method: 'post',
      data: { ...data, Token: this.getToken() },
      ...options,
    });
  }

  static put(url: string, data: any, options?: any) {
    return HttpService.makeRequest({
      url,
      method: 'put',
      data: { ...data, Token: this.getToken() },
      ...options,
    });
  }

  static patch(url: string, data: any, options?: any) {
    return HttpService.makeRequest({
      url,
      method: 'patch',
      data: { ...data, Token: this.getToken() },
      ...options,
    });
  }

  static delete(url: string, data: any, options?: any) {
    return HttpService.makeRequest({
      url,
      method: 'delete',
      data: { ...data, Token: this.getToken() },
      ...options,
    });
  }

  static makeRequest(config: any) {
    const cancelToken = this.source.token;

    config.headers = Object.assign(config.headers || {}, {
      'Content-Type': 'application/json',
    });

    return axios
      .request({ ...config, cancelToken })
      .then((res) => {
        return res;
      })
      .catch((er) => {
        throw er;
      });
  }
}
