import { createContext, useState, useEffect, JSX } from "react";
import {AccountStorageType, ConfigType, PolkadotContextType} from "./types";
import {InjectedAccountWithMeta, InjectedExtension} from "@polkadot/extension-inject/types";
import {ApiPromise} from "@polkadot/api";
import {web3Accounts, web3Enable, web3FromAddress} from "@polkadot/extension-dapp";
import {getFormatAddress} from "../../libs/getFormatAddress";
import {getPolkadotApi} from "../../libs/getPolkadotApi";

export const PolkadotContext = createContext<PolkadotContextType | null>(null);

export const PolkadotProvider = ({ children, config }: { children: JSX.Element, config: ConfigType }) => {
  const [address, setAddress] = useState<string | undefined>();
  const [addresses, setAddresses] = useState<InjectedAccountWithMeta[]>([]);
  const [injector, setInjector] = useState<InjectedExtension | undefined>();
  const [metaName, setMetaName] = useState<string | undefined>();
  const [api, setApi] = useState<ApiPromise>();

  const LOCAL_STORAGE_NAME = `${config.appName}_polkadot`

  const disconnect = () => {
    localStorage.removeItem(LOCAL_STORAGE_NAME);
    setAddress(undefined);
    setMetaName(undefined);
    setInjector(undefined);
    setAddresses([]);
  };

  const connect = async (
    metaName: string = "polkadot-js",
  ): Promise<InjectedAccountWithMeta[]> => {
    try {
      const extensions = await web3Enable(config.appName);

      if (extensions.length) {
        const allAccounts = await web3Accounts();

        // get accounts from certain wallet extension
        const walletAccounts = allAccounts.filter(
          (item) => item.meta.source === metaName,
        );
        // if accounts found we set wallet name for using in dapp
        setMetaName(walletAccounts.length ? metaName : undefined);
        setAddresses(walletAccounts);
        return walletAccounts
      } else {
        setMetaName(undefined);
        setAddresses([])
        return []
      }
    } catch (e) {
      setMetaName(undefined);
      setAddresses([])
      return []
    }
  };

  const selectAddress = async (address: string) => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_NAME,
        JSON.stringify({ metaName, account: address }),
      );
      setAddress(getFormatAddress(address, config.prefix));
    } catch (e) {
      disconnect();
    }
  };

  useEffect(() => {
    (async () => {
      const connectedAccount = localStorage.getItem(LOCAL_STORAGE_NAME);
      if (connectedAccount) {
        const accountFromStorage: AccountStorageType = JSON.parse(connectedAccount);
        if (accountFromStorage.address && accountFromStorage.metaName) {
          // get account via metaName from storage
          const accounts = await connect(accountFromStorage.metaName);

          // search account from account list
          const account = accounts.filter(
            (account) =>
              account.address.toLowerCase() === accountFromStorage.address.toLowerCase(),
          )[0];
          if (account) {
            setAddress(getFormatAddress(account.address));
            setMetaName(accountFromStorage.metaName);
          } else {
            // clear state if account not found
            disconnect()
          }
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { api } = getPolkadotApi(config.rpcLink, config.apiOptions);
        await api.isReadyOrError;
        setApi(api);
      } catch (e) {
        console.log(e)
      }
    })();
  }, []);

  useEffect(() => {
    if (address) {
      web3FromAddress(address).then((res) => {
        setInjector(res);
      });
    } else {
      setInjector(undefined);
    }
  }, [address]);

  return (
    <PolkadotContext.Provider value={{
      address,
      addresses,
      selectAddress,
      connect,
      disconnect,
      injector,
      api
    }}>
      { children }
    </PolkadotContext.Provider>
  );
};
