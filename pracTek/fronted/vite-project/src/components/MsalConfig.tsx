import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "cae07ffa-36fc-4396-9b87-cb61256b5076",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:5173/",
  },
};

const msalInstance = new PublicClientApplication(msalConfig);
