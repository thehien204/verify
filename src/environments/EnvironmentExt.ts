import {Environment} from "@node_modules/@abp/ng.core";

export interface EnvironmentExt extends Environment {
  firebaseConfig: any,

  [prop: string]: any
}
