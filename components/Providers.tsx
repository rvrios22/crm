"use client";

import { HeroUIProvider } from "@heroui/react";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <HeroUIProvider>
            {children}
        </HeroUIProvider>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
