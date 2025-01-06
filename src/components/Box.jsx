import { useState } from "react";

export default function Box({ children, className }) {
  return <div className={`relative ${className}`}>{children}</div>;
}
