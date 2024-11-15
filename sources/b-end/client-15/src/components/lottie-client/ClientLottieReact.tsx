"use client";
import Lottie from "lottie-react";
import { ComponentProps } from "react";

type LottieProps = ComponentProps<typeof Lottie>;

const ClientLottieReact = ({ ...props }: LottieProps) => {
  return <Lottie {...props} />;
};

export default ClientLottieReact;
