import { useContext } from "react";
import { PolkadotContext } from './PolkadotContext';
import { PolkadotContextType } from "./types";

export const usePolkadot = () => useContext(PolkadotContext) as PolkadotContextType;
