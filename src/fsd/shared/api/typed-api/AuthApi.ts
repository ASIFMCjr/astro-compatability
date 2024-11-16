/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface RequestsRefreshTokensRequest {
  refresh_token: string;
}

export interface RequestsSignInWithWalletRequest {
  wallet_pub: string;
}

export interface RequestsVerifySignatureRequest {
  signature: string;
  wallet_pub: string;
}

export interface ResponseErrorResponse {
  error: string;
}

export interface ResponseRefreshTokensResponse {
  access_token: string;
  refresh_token: string;
}

export interface ResponseSignInWithWalletResponse {
  nonce: string;
}

export interface ResponseVerifySignatureResponse {
  access_token: string;
  refresh_token: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title No title
 * @contact
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Обновление access и refresh токенов с использованием валидного refresh токена
     *
     * @tags auth
     * @name AuthRefreshTokensCreate
     * @summary Обновление Access и Refresh токенов
     * @request POST:/api/auth/refresh-tokens
     */
    authRefreshTokensCreate: (refreshTokens: RequestsRefreshTokensRequest, params: RequestParams = {}) =>
      this.request<ResponseRefreshTokensResponse, ResponseErrorResponse>({
        path: `/api/auth/refresh-tokens`,
        method: "POST",
        body: refreshTokens,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Авторизация пользователя с использованием его Ethereum кошелька
     *
     * @tags auth
     * @name AuthSignInCreate
     * @summary Авторизация через кошелек
     * @request POST:/api/auth/sign-in
     */
    authSignInCreate: (signInWithWallet: RequestsSignInWithWalletRequest, params: RequestParams = {}) =>
      this.request<ResponseSignInWithWalletResponse, ResponseErrorResponse>({
        path: `/api/auth/sign-in`,
        method: "POST",
        body: signInWithWallet,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Проверка подписи с использованием публичного ключа
     *
     * @tags auth
     * @name AuthVerifySignatureCreate
     * @summary Верификация подписи
     * @request POST:/api/auth/verify-signature
     */
    authVerifySignatureCreate: (verifySignature: RequestsVerifySignatureRequest, params: RequestParams = {}) =>
      this.request<ResponseVerifySignatureResponse, ResponseErrorResponse>({
        path: `/api/auth/verify-signature`,
        method: "POST",
        body: verifySignature,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
