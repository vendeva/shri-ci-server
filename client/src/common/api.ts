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

export interface BuildModel {
  /** @format uuid */
  id: string;

  /** @format uuid */
  configurationId: string;

  /** @format int32 */
  buildNumber: number;
  commitMessage: string;
  commitHash: string;
  branchName: string;
  authorName: string;
  status: BuildStatus;

  /** @format date-time */
  start?: string | null;

  /** @format int32 */
  duration?: number | null;
}

export interface BuildModelArrayHomeworkApiResponse {
  data?: BuildModel[] | null;
}

export interface BuildModelHomeworkApiResponse {
  data?: BuildModel;
}

export interface BuildRequestResultModel {
  /** @format uuid */
  id: string;

  /** @format int32 */
  buildNumber: number;
  status: BuildStatus;
}

export interface BuildRequestResultModelHomeworkApiResponse {
  data?: BuildRequestResultModel;
}

export enum BuildStatus {
  Waiting = "Waiting",
  InProgress = "InProgress",
  Success = "Success",
  Fail = "Fail",
  Canceled = "Canceled",
}

export interface CancelBuildInput {
  /** @format uuid */
  buildId: string;
}

export interface ConfigurationInput {
  repoName: string;
  buildCommand: string;
  mainBranch: string;

  /** @format int32 */
  period: number;
}

export interface ConfigurationModel {
  /** @format uuid */
  id: string;
  repoName: string;
  buildCommand: string;
  mainBranch: string;

  /** @format int32 */
  period: number;
}

export interface ConfigurationModelHomeworkApiResponse {
  data?: ConfigurationModel;
}

export interface FinishBuildInput {
  /** @format uuid */
  buildId: string;

  /** @format int32 */
  duration: number;
  success: boolean;
  buildLog: string;
}

export interface QueueBuildInput {
  commitMessage: string;
  commitHash: string;
  branchName: string;
  authorName: string;
}

export interface StartBuildInput {
  /** @format uuid */
  buildId: string;

  /** @format date-time */
  dateTime: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://shri.yandex/hw/api";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title School CI API
 * @version v1
 * @baseUrl https://shri.yandex/hw/api
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  build = {
    /**
     * No description
     *
     * @tags Build
     * @name GetList
     * @request GET:/build/list
     * @secure
     */
    getList: (query?: { offset?: number; limit?: number }, params: RequestParams = {}) =>
      this.request<BuildModelArrayHomeworkApiResponse, any>({
        path: `/build/list`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Build
     * @name GetBuildLog
     * @request GET:/build/log
     * @secure
     */
    getBuildLog: (query?: { buildId?: string }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/build/log`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Build
     * @name GetBuildDetails
     * @request GET:/build/details
     * @secure
     */
    getBuildDetails: (query?: { buildId?: string }, params: RequestParams = {}) =>
      this.request<BuildModelHomeworkApiResponse, any>({
        path: `/build/details`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Build
     * @name QueueBuild
     * @request POST:/build/request
     * @secure
     */
    queueBuild: (data: QueueBuildInput, params: RequestParams = {}) =>
      this.request<BuildRequestResultModelHomeworkApiResponse, any>({
        path: `/build/request`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Build
     * @name ReportBuildStarted
     * @request POST:/build/start
     * @secure
     */
    reportBuildStarted: (data: StartBuildInput, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/build/start`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Build
     * @name ReportBuildFinished
     * @request POST:/build/finish
     * @secure
     */
    reportBuildFinished: (data: FinishBuildInput, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/build/finish`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Build
     * @name ReportBuildCanceled
     * @request POST:/build/cancel
     * @secure
     */
    reportBuildCanceled: (data: CancelBuildInput, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/build/cancel`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  conf = {
    /**
     * No description
     *
     * @tags BuildConfiguration
     * @name Get
     * @request GET:/conf
     * @secure
     */
    get: (params: RequestParams = {}) =>
      this.request<ConfigurationModelHomeworkApiResponse, any>({
        path: `/conf`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags BuildConfiguration
     * @name Post
     * @request POST:/conf
     * @secure
     */
    post: (data: ConfigurationInput, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/conf`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags BuildConfiguration
     * @name Delete
     * @request DELETE:/conf
     * @secure
     */
    delete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/conf`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
