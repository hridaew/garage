"use client";

import Link from "next/link";
import { useTransition } from "@/components/motion/RouteTransitionLayer";

interface NavigationLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function NavigationLink({
  href,
  children,
  className,
  onClick,
  ...rest
}: NavigationLinkProps) {
  const { navigateTo } = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Allow cmd/ctrl-click to open in new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    // Allow external links
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

    e.preventDefault();
    onClick?.(e);
    navigateTo(href);
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
