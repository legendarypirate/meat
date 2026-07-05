import { Suspense } from "react";
import { Header } from "./Header";

type HeaderWrapperProps = {
  variant?: "home" | "shop";
  showSearch?: boolean;
};

function HeaderFallback() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto h-16 max-w-7xl px-4 sm:px-6 lg:h-20 lg:px-8" />
    </header>
  );
}

export function HeaderWrapper(props: HeaderWrapperProps) {
  return (
    <Suspense fallback={<HeaderFallback />}>
      <Header {...props} />
    </Suspense>
  );
}
