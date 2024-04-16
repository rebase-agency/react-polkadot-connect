import {ApiPromise, WsProvider} from "@polkadot/api";
import {ApiOptions} from "@polkadot/api/types";

export const getPolkadotApi = (rpcUrl: string = "wss://rpc.polkadot.io", options?: ApiOptions) => {
  const provider = new WsProvider(rpcUrl, 100);

  const api = new ApiPromise({
    provider,
    ...options
  });
  return { api };
};
