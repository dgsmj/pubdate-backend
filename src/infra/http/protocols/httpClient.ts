/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpClient {
  get (url: string): Promise<any>
  post (url: string, data: any): Promise<any>
}
