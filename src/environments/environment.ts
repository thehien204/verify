import {EnvironmentExt} from "./EnvironmentExt";



const baseUrl = 'http://localhost:4200';
const bootstrapSettings = (window as any).bootstrapSettings;

export const environment: EnvironmentExt = {
  production: false,
  firebaseConfig: bootstrapSettings.firebaseConfig,
  application: {
    baseUrl,
    name: 'Verify',
  },
  oAuthConfig: {
    issuer: 'http://localhost:5000',
    redirectUri: baseUrl,
    clientId: 'Verify_App',
    dummyClientSecret: 'Verify**2022',
    // responseType: 'code',
    scope: 'offline_access Verify',
    requireHttps: false,
  },
  apis: {
    default: {
      url: 'http://localhost:5000',
      rootNamespace: 'Verify',
    }
  },
};
