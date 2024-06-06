"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { config } from "@/lib/wagmi";
import { ModeToggle } from "@/components/modeToggle";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="fixed top-0 left-0 right-0 p-4 flex justify-between text-sm top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="text-2xl">CoinFlip 🪙🩴</div>
            <div className="flex justify-end">
              <ConnectButton />
              <div className="ml-2">
                <ModeToggle />
              </div>
            </div>
          </div>
          {children}
          <footer className="fixed bottom-0 left-0 right-0 text-center p-2">Made with ❤️ by your frens at meme factory 📈</footer>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
