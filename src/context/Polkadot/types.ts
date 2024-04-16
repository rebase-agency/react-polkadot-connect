import { InjectedExtension} from "@polkadot/extension-inject/types";
import {ApiPromise} from "@polkadot/api";
import {ApiOptions} from "@polkadot/api/types";

export interface PolkadotContextType {
  address: string | undefined;
  addresses: string[]
  injector: InjectedExtension | undefined;
  connect: (metaName?: string) => void;
  disconnect: () => void
  selectAddress: (address: string) => void;
  api: ApiPromise;
}

export interface ConfigType {
  rpcLink?: string
  appName: string
  prefix?: number
  apiOptions?: ApiOptions
}

export interface AccountStorageType {
  metaName: string
  address: string
}
