/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Window {
    walletExtension: any;
    injectedWeb3: any;
  }
}
