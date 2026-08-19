"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CallbackForm = dynamic(
  () => import("@/components/CallbackForm").then((mod) => mod.CallbackForm),
  { ssr: false },
);

export function DeferredCallbackForm() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enable = () => setReady(true);
    const timer = setTimeout(enable, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) {
    return <div className="min-h-[28rem]" aria-hidden="true" />;
  }

  return <CallbackForm />;
}
