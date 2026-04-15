"use client";

import { templateComponents } from "@/lib/template-registry";
import type { WeddingEvent } from "@/lib/data";

interface EditorPreviewProps {
  templateId: string;
  event: WeddingEvent;
}

export function EditorPreview({ templateId, event }: EditorPreviewProps) {
  const TemplateComponent = templateComponents[templateId];

  if (!TemplateComponent) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        Template tidak ditemukan
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-lg overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
        <TemplateComponent event={event} />
      </div>
    </div>
  );
}
