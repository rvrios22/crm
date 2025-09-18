"use client";

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/react";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <HeroUIProvider>
          <ToastProvider />
          {children}
        </HeroUIProvider>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
