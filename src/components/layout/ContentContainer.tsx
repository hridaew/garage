interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function ContentContainer({
  children,
  className = "",
  as = "div",
}: ContentContainerProps) {
  const Tag = as;

  return <Tag className={`content-rail ${className}`}>{children}</Tag>;
}
