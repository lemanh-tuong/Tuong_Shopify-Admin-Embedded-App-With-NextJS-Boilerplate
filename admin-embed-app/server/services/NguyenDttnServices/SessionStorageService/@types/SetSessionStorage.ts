export interface SetSessionStorage_BEExpectParameters {
  key: string;
  values: string; // JSON
}
export interface SetSessionStorage_Response {
  data: { id: number };
  message: string;
  status: string;
}
