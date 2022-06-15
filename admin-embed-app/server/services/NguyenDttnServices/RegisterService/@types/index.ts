import { Register_BEExpectParameters } from './Register';

export interface IRegisterService {
  register: (parameters: Register_BEExpectParameters) => Promise<boolean>;
}

export * from './Register';
