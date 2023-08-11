import { EnvironmentExt } from "./EnvironmentExt";

const bootstrapSettings = (window as any).bootstrapSettings;
const baseUrl = bootstrapSettings.baseUrl;
const identityUrl = bootstrapSettings.identityUrl;

export const environment: EnvironmentExt = {
  production: false,
  firebaseConfig: bootstrapSettings.firebaseConfig,
  application: {
    baseUrl,
    name: 'OrdCo',
  },
  oAuthConfig: {
    issuer: identityUrl,
    redirectUri: baseUrl,
    clientId: 'Verify_App',
    dummyClientSecret: 'Verify**2022',
    // responseType: 'code',
    scope: 'offline_access Verify',
    requireHttps: false,
  },
  apis: {
    default: {
      url: identityUrl,
      rootNamespace: 'Verify',
    },
    danhMuc: {
      url: identityUrl
    },
  },
};
