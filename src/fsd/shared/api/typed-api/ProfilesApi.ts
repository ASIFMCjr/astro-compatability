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

export interface ModelProfile {
  account_id?: string;
  description?: string;
  email?: string;
  login?: string;
  name?: string;
  photo?: string;
  profile_id?: string;
}

export interface RequestsSaveProfileRequest {
  description?: string;
  email?: string;
  login: string;
  name: string;
  photo?: string;
  photo_filename?: string;
  role: string;
}

export interface RequestsUpdateProfileRequest {
  description?: string;
  email?: string;
  login?: string;
  name?: string;
  photo?: string;
  photo_filename?: string;
}

export interface ResponseErrorResponse {
  error: string;
}

export interface ResponseGetMeResponse {
  account_id?: string;
  description?: string;
  email?: string;
  login?: string;
  name?: string;
  photo?: string;
  profile_id?: string;
}

export interface ResponseSaveProfileResponse {
  access_token?: string;
  refresh_token?: string;
}

export interface ResponseUpdateProfileResponse {
  account_id?: string;
  description?: string;
  email?: string;
  login?: string;
  name?: string;
  photo?: string;
  profile_id?: string;
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
     * @description Update an existing profile
     *
     * @tags profiles
     * @name ProfilesUpdate
     * @summary Update Profile
     * @request PUT:/api/profiles/
     */
    profilesUpdate: (profile: RequestsUpdateProfileRequest, params: RequestParams = {}) =>
      this.request<ResponseUpdateProfileResponse, ResponseErrorResponse>({
        path: `/api/profiles/`,
        method: "PUT",
        body: profile,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Save a new profile
     *
     * @tags profiles
     * @name ProfilesCreate
     * @summary Save Profile
     * @request POST:/api/profiles/
     */
    profilesCreate: (profile: RequestsSaveProfileRequest, params: RequestParams = {}) =>
      this.request<ResponseSaveProfileResponse, ResponseErrorResponse>({
        path: `/api/profiles/`,
        method: "POST",
        body: profile,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve the current user's profile
     *
     * @tags profiles
     * @name ProfilesMeList
     * @summary Get current user's profile
     * @request GET:/api/profiles/me
     */
    profilesMeList: (params: RequestParams = {}) =>
      this.request<ResponseGetMeResponse, ResponseErrorResponse>({
        path: `/api/profiles/me`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Get a profile by its ID
     *
     * @tags profiles
     * @name ProfilesDetail
     * @summary Get Profile by ID
     * @request GET:/api/profiles/{id}
     */
    profilesDetail: (id: string, params: RequestParams = {}) =>
      this.request<ModelProfile, ResponseErrorResponse>({
        path: `/api/profiles/${id}`,
        method: "GET",
        ...params,
      }),
  };
}
