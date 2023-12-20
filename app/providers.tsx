"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, createLocalStorageManager } from "@chakra-ui/react";

import theme from "../app/src/themes/index";



export function Providers({ children }: { children: React.ReactNode }) {
const manager = createLocalStorageManager(theme.toString())
  return (
      <CacheProvider>
        <ChakraProvider theme={theme}  colorModeManager={manager}>{children}</ChakraProvider>
      </CacheProvider>
  );
}
