"use client";
import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

// Lazy Load for import lottie-react
// (need to lazy load due to waiting for "document")
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

type LottieProps = ComponentProps<typeof Lottie>;

const ClientLottieReact = ({ ...props }: LottieProps) => {
  return <Lottie {...props} />;
};

export default ClientLottieReact;
