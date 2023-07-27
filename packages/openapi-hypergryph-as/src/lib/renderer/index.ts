import { OpenApiBuilder } from 'openapi3-ts/oas31'
import { createDefaultRegistry } from './schema'
import packageJson from '../../../package.json'

export const renderDocument = async () => {
  const registry = await createDefaultRegistry()
  const builder = new OpenApiBuilder()
    .addInfo({
      title: 'AS HyperGryph Unofficial API',
      version: packageJson.version,
      description:
        'This is an unofficial API for as.hypergryph.com. ' +
        'It is not officially supported by HyperGryph and may break at any time.',
      termsOfService: 'https://www.hypergryph.com/agreement/',
    })
    .addServer({
      url: 'https://as.hypergryph.com',
      description: 'AS HyperGryph server, related to HyperGryph Accounts.',
    })
    .addTag({ name: 'auth', description: 'Authorization Operations' })
    .addPath('/user/auth/v1/token_by_phone_password', {
      post: {
        tags: ['auth'],
        summary:
          '通过鹰角网络通行证绑定的手机号码和密码获取鹰角网络通行证 token',
        description: '注：即便账号或密码错误，该接口也会返回 200 OK。',
        operationId: 'GetTokenByPhonePassword',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: registry.assertThenRef(
                'GetTokenByPhonePasswordRequestData',
                { wrapped: false },
              ),
            },
          },
        },
        responses: {
          200: {
            description: '成功、账号错误或密码错误',
            content: {
              'application/json': {
                schema: registry.assertThenRef(
                  'GetTokenByPhonePasswordResponseData',
                ),
              },
            },
          },
        },
      },
    })
    .addPath('/user/oauth2/v2/grant', {
      post: {
        tags: ['auth'],
        summary:
          '通过鹰角网络通行证 token 获取鹰角网络通行证 OAuth2 授权码（Authorization Code）',
        description: '部分请求字段的作用暂时未知，但不影响一般的使用。',
        operationId: 'OAuthGrant',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: registry.assertThenRef('OAuthGrantRequestData', {
                wrapped: false,
              }),
            },
          },
        },
        responses: {
          200: {
            description: '成功',
            content: {
              'application/json': {
                schema: registry.assertThenRef('OAuthGrantResponseData'),
              },
            },
          },
          401: {
            description: '登录已过期',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    code: {
                      type: 'integer',
                      description: '错误代码',
                      example: 3,
                    },
                    message: {
                      type: 'string',
                      description: '错误信息',
                      example: '登录已过期，请重新登录',
                    },
                  },
                  required: ['code', 'message'],
                },
              },
            },
          },
        },
      },
    })

  registry.addToBuilder(builder)

  return builder.rootDoc
}