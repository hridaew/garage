"use client";

import { RicosViewer, quickStartViewerPlugins } from "@wix/ricos";
import "@wix/ricos/css/all-plugins-viewer.css";

const plugins = quickStartViewerPlugins();

export default function RichContent({ content }: { content: unknown }) {
  if (!content || typeof content !== "object") return null;
  return <RicosViewer content={content as never} plugins={plugins} />;
}
