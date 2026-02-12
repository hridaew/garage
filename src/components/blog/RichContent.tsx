/* eslint-disable @next/next/no-img-element */
import React from "react";

interface RichContentNode {
  type: string;
  id?: string;
  nodes?: RichContentNode[];
  textData?: {
    text: string;
    decorations?: Array<{ type: string; [key: string]: unknown }>;
  };
  headingData?: { level: number };
  paragraphData?: Record<string, unknown>;
  imageData?: {
    image?: {
      src?: { url?: string };
      width?: number;
      height?: number;
    };
    altText?: string;
  };
  videoData?: Record<string, unknown>;
  listData?: { indentation?: number };
  dividerData?: Record<string, unknown>;
  codeBlockData?: Record<string, unknown>;
  blockquoteData?: Record<string, unknown>;
}

function renderTextNode(node: RichContentNode): React.ReactNode {
  if (node.type === "TEXT" && node.textData) {
    let content: React.ReactNode = node.textData.text;
    const decorations = node.textData.decorations || [];
    for (const dec of decorations) {
      if (dec.type === "BOLD") content = <strong>{content}</strong>;
      if (dec.type === "ITALIC") content = <em>{content}</em>;
      if (dec.type === "UNDERLINE") content = <u>{content}</u>;
      if (dec.type === "LINK" && dec.linkData) {
        const link = dec.linkData as { link?: { url?: string } };
        content = (
          <a
            href={link.link?.url || "#"}
            className="text-garage-blue hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        );
      }
    }
    return content;
  }
  return null;
}

function renderChildren(nodes: RichContentNode[]): React.ReactNode[] {
  return nodes.map((child, i) => {
    const textContent = renderTextNode(child);
    if (textContent !== null) return <React.Fragment key={i}>{textContent}</React.Fragment>;
    return <RichContentRenderer key={i} node={child} />;
  });
}

function RichContentRenderer({ node }: { node: RichContentNode }) {
  const children = node.nodes ? renderChildren(node.nodes) : null;

  switch (node.type) {
    case "HEADING": {
      const level = node.headingData?.level || 2;
      const className =
        level === 1
          ? "text-3xl font-extrabold mt-8 mb-4"
          : level === 2
            ? "text-2xl font-bold mt-7 mb-3"
            : level === 3
              ? "text-xl font-semibold mt-6 mb-2"
              : "text-lg font-semibold mt-5 mb-2";
      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
      return <Tag className={className}>{children}</Tag>;
    }

    case "PARAGRAPH":
      return (
        <p className="text-garage-black/80 leading-relaxed mb-4">{children}</p>
      );

    case "BULLETED_LIST":
      return <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>;

    case "ORDERED_LIST":
      return <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>;

    case "LIST_ITEM":
      return <li className="text-garage-black/80 leading-relaxed">{children}</li>;

    case "BLOCKQUOTE":
      return (
        <blockquote className="border-l-4 border-garage-blue pl-4 my-6 italic text-garage-gray">
          {children}
        </blockquote>
      );

    case "CODE_BLOCK":
      return (
        <pre className="bg-garage-light rounded-lg p-4 my-4 overflow-x-auto">
          <code className="text-sm font-mono text-garage-black">{children}</code>
        </pre>
      );

    case "DIVIDER":
      return <hr className="my-8 border-garage-border" />;

    case "IMAGE": {
      const url = node.imageData?.image?.src?.url;
      if (!url) return null;
      const imgSrc = url.startsWith("wix:image://")
        ? `https://static.wixstatic.com/media/${url.replace("wix:image://v1/", "").split("/")[0]}`
        : url;
      return (
        <figure className="my-6">
          <img
            src={imgSrc}
            alt={node.imageData?.altText || ""}
            className="rounded-lg w-full"
            loading="lazy"
          />
        </figure>
      );
    }

    default:
      if (children) return <>{children}</>;
      return null;
  }
}

export default function RichContent({
  content,
}: {
  content: { nodes?: RichContentNode[] | unknown[] };
}) {
  if (!content?.nodes?.length) return null;
  return (
    <div className="prose-custom">
      {(content.nodes as RichContentNode[]).map((node, i) => (
        <RichContentRenderer key={i} node={node} />
      ))}
    </div>
  );
}
