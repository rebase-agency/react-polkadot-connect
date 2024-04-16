import {InjectedAccountWithMeta, InjectedExtension} from "@polkadot/extension-inject/types";
import {ApiPromise} from "@polkadot/api";
import {ApiOptions} from "@polkadot/api/types";

export interface PolkadotContextType {
  address: string | undefined;
  addresses: InjectedAccountWithMeta[]
  injector: InjectedExtension | undefined;
  connect: (metaName?: string) => Promise<InjectedAccountWithMeta[]>;
  disconnect: () => void
  selectAddress: (address: string) => void;
  api: ApiPromise | undefined;
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
