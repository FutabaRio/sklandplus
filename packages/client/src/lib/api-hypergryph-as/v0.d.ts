/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/user/auth/v1/token_by_phone_password": {
    /**
     * 通过鹰角网络通行证绑定的手机号码和密码获取鹰角网络通行证 token
     * @description 注：即便账号或密码错误，该接口也会返回 200 OK。
     */
    post: operations["GetTokenByPhonePassword"];
  };
  "/user/oauth2/v2/grant": {
    /**
     * 通过鹰角网络通行证 token 获取鹰角网络通行证 OAuth2 授权码（Authorization Code）
     * @description 部分请求字段的作用暂时未知，但不影响一般的使用。
     */
    post: operations["OAuthGrant"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    GetTokenByPhonePasswordRequestData: {
      /**
       * @description 鹰角网络通行证绑定的手机号码
       * @example 13012345678
       */
      phone: string;
      /**
       * @description 鹰角网络通行证的密码
       * @example Miku3939
       */
      password: string;
      [key: string]: unknown;
    };
    GetTokenByPhonePasswordResponseData: {
      /**
       * @description 鹰角网络通行证 token。注：提供的例子已经过脱敏处理
       * @example AAAALXgBLPoCAAAAZT0lzUnmq2020AAADiPjJzaWBmsoYIojpuCgAAANNpmsQSFFLlEfpJDCq6Mka/PtEf//AlIARhPVo4iPePgtFCJUqjNTN9W6egJdmjTdohmA3h1B
       */
      token: string;
      [key: string]: unknown;
    };
    OAuthGrantRequestData: {
      /**
       * @description 鹰角网络通行证 token。注：提供的例子已经过脱敏处理
       * @example AAAALXgBLPoCAAAAZT0lzUnmq2020AAADiPjJzaWBmsoYIojpuCgAAANNpmsQSFFLlEfpJDCq6Mka/PtEf//AlIARhPVo4iPePgtFCJUqjNTN9W6egJdmjTdohmA3h1B
       */
      token: string;
      /**
       * @description （未知）疑似应用代码
       * @enum {unknown}
       */
      appCode: "4ca99fa6b56cc2ba";
      /**
       * @description （未知）疑似登录类型
       * @constant
       */
      type: 0;
      [key: string]: unknown;
    };
    OAuthGrantResponseData: {
      /**
       * @description 鹰角网络通行证 OAuth2 授权码（Authorization Code）。注：提供的例子已经过脱敏处理
       * @example AAAALXgBLPoCAAAAZT0lzUnmq2020AAADiPjJzaWBmsoYIojpuCgAAANNpmsQSFFLlEfpJDCq6Mka/PtEf//AlIARhPVo4iPePgtFCJUqjNTN9W6egJdmjTdohmA3h1zegtDce8a13dZ73ZkS+GIlLre2g0fBqF2hXtQhxnwKmcvIpk=
       */
      code: string;
      /**
       * @description 鹰角网络通行证的 ID。
       * @example 1234567891234
       */
      uid: string;
      [key: string]: unknown;
    };
  };
  responses: {
  };
  parameters: {
  };
  requestBodies: {
  };
  headers: {
  };
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  /**
   * 通过鹰角网络通行证绑定的手机号码和密码获取鹰角网络通行证 token
   * @description 注：即便账号或密码错误，该接口也会返回 200 OK。
   */
  GetTokenByPhonePassword: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["GetTokenByPhonePasswordRequestData"];
      };
    };
    responses: {
      /** @description 成功、账号错误或密码错误 */
      200: {
        content: {
          "application/json": {
            /**
             * @description Business-level response code
             * @example 0
             */
            code: number;
            /**
             * @description Business-level response message
             * @example OK
             */
            message: string;
            data: components["schemas"]["GetTokenByPhonePasswordResponseData"];
          };
        };
      };
    };
  };
  /**
   * 通过鹰角网络通行证 token 获取鹰角网络通行证 OAuth2 授权码（Authorization Code）
   * @description 部分请求字段的作用暂时未知，但不影响一般的使用。
   */
  OAuthGrant: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["OAuthGrantRequestData"];
      };
    };
    responses: {
      /** @description 成功 */
      200: {
        content: {
          "application/json": {
            /**
             * @description Business-level response code
             * @example 0
             */
            code: number;
            /**
             * @description Business-level response message
             * @example OK
             */
            message: string;
            data: components["schemas"]["OAuthGrantResponseData"];
          };
        };
      };
      /** @description 登录已过期 */
      401: {
        content: {
          "application/json": {
            /**
             * @description 错误代码
             * @example 3
             */
            code: number;
            /**
             * @description 错误信息
             * @example 登录已过期，请重新登录
             */
            message: string;
          };
        };
      };
    };
  };
}