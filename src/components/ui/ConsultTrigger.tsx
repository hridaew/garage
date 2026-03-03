"use client";

import { useRef, useState } from "react";
import PremiumButton, { PremiumButtonProps } from "@/components/ui/PremiumButton";
import ConsultPopover, { ConsultPayload } from "@/components/ui/ConsultPopover";

interface ConsultTriggerProps {
  buttonClassName?: string;
  variant?: PremiumButtonProps["variant"];
  size?: PremiumButtonProps["size"];
  magnetic?: boolean;
  icon?: React.ReactNode;
}

export default function ConsultTrigger({
  buttonClassName = "",
  variant = "primary",
  size = "md",
  magnetic = false,
  icon,
}: ConsultTriggerProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (payload: ConsultPayload) => {
    void payload;
    await new Promise((resolve) => setTimeout(resolve, 900));
  };

  return (
    <>
      <div ref={anchorRef} className="inline-flex">
        <PremiumButton
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          variant={variant}
          size={size}
          className={buttonClassName}
          magnetic={magnetic}
          celebrateOnRelease
          icon={icon}
        >
          Book your free consult
        </PremiumButton>
      </div>
      <ConsultPopover
        open={open}
        anchorRef={anchorRef}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
