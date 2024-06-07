"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ConnectButton, RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { config } from "@/lib/wagmi";
import { ModeToggle } from "@/components/modeToggle";
import { useTheme } from "next-themes";
import Image from "next/image";
import { AmpdLogoIcon } from "@/components/icons";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  const dark = darkTheme({
    accentColor: "#7b3fe4",
    accentColorForeground: "white",
    borderRadius: "medium",
  });
  const light = lightTheme({
    accentColor: "#7b3fe4",
    accentColorForeground: "white",
    borderRadius: "medium",
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={resolvedTheme === 'dark' ? dark : light}>
          <div className="fixed top-0 left-0 right-0 p-4 flex justify-between text-sm top-0 z-50 w-full border-b dark:border-none dark:bg-white/5 backdrop-blur-sm">
            <div className="text-2xl flex justify-center items-center">
              <Image className="mr-2" src="/logo.png" width={32} height={32} alt="AMPD Labs logo" /><span className="text-base">AMPDLabs</span>
            </div>
            <div className="flex justify-end">
              <ConnectButton />
              <div className="ml-2">
                <ModeToggle />
              </div>
            </div>
          </div>
          {children}
          <footer className="fixed bottom-0 left-0 right-0 text-center p-2 flex justify-center items-center text-sm">Made with ❤️ by your frens at AMPDLabs </footer>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
