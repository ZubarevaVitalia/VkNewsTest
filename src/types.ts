export enum ApiEndpoint {
    InitialData = 'getInitialData',
    NewsInfo = 'getNewsInfo',
}

export interface Category {
    id: number
    name: string
    productCount: number
  }

export interface NewsInfo {
    id: number
    deleted?: boolean
    type?: string
    by?: string
    time?: number
    text?: string
    dead?: boolean
    parent?: number
    poll?: number
    kids?: number[]
    url?: string
    score?: number
    title?: string
    parts?: number[]
    descendants?: number
}
