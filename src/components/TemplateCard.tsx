import Link from "next/link";

export interface TemplateCardItem {
  id: string;
  name: string;
  description: string;
  category: string;
  previewColor: string;
  accentColor: string;
}

export function TemplateCard({
  template,
}: {
  template: TemplateCardItem;
}) {
  return (
    <Link
      href={`/undangan/${template.id}`}
      className="group block rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
    >
      <div
        className="h-64 relative flex items-center justify-center"
        style={{ backgroundColor: template.previewColor }}
      >
        <div className="text-center text-white p-6">
          <div
            className="text-4xl mb-3 opacity-80"
            style={{ color: template.accentColor }}
          >
            ❦
          </div>
          <p
            className="text-lg font-serif italic"
            style={{ color: template.accentColor }}
          >
            Anisa &amp; Budi
          </p>
          <p className="text-xs mt-2 opacity-60">15 Juni 2026</p>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium">
            Lihat Preview →
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900">{template.name}</h3>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {template.category}
          </span>
        </div>
        <p className="text-sm text-gray-500">{template.description}</p>
      </div>
    </Link>
  );
}
