import React from 'react';
import {
  Code2, FileCode, Paintbrush, Database, Rocket, Sparkles, Zap, Layers,
} from 'lucide-react';

const ICON_MAP = {
  Code2,
  FileCode,
  Paintbrush,
  Database,
  Rocket,
  Sparkles,
  Zap,
  Layers,
};

export default function TechBadge({ name, icon, status }) {
  const Icon = ICON_MAP[icon] || Code2;
  const statusVariant = status === 'Learning' ? 'bg-accent/10 text-accent border-accent/30' : 'bg-surface/10 text-fg border-border/50';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-mono ${statusVariant} transition-colors hover:bg-surface/20`}>
      <Icon size={12} className="shrink-0" />
      {name}
      {status === 'Learning' && (
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
      )}
    </span>
  );
}
