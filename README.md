# @rebase-agency/react-polkadot-connect

## Install

Install package:

```shell
npm i @rebase-agency/react-polkadot-connect
```

or

```shell
yarn add @rebase-agency/react-polkadot-connect
```

## Usage

Set up provider:

```tsx
import {PolkadotProvider} from "@rebase-agency/react-polkadot-connect";

const root = createRoot(document.getElementById("root")!);

root.render(
  <PolkadotProvider config={{
    rpcLink: "..."
    appName: "..."
  }}>
    <App />
  </PolkadotProvider>
);
```

Then you can use hook for connect, account etc.:

```tsx
import {usePolkadot} from "@rebase-agency/react-polkadot-connect";

const { address, connect, addresses, selectAddress } = usePolkadot()
```


