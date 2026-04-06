import { CodeIcon } from "lucide-react";
import { PaletteIcon } from "lucide-react";
import { TerminalIcon } from "lucide-react";
import { DatabaseIcon } from "lucide-react";
import Tool from "./Tool";
export const TradeTools = () => {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-[3px] grow bg-outline-variant border-dashed border-t-2 border-outline"></div>
        <h2 className="font-headline text-2xl font-black uppercase tracking-widest shrink-0">
          Tools of the Trade
        </h2>
        <div className="h-[3px] grow bg-outline-variant border-dashed border-t-2 border-outline"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Tool
          name="React"
          description="UI Architecture"
          icon={
            <CodeIcon className="w-6 h-6 text-(--on-primary-container) text-2xl" />
          }
          color="bg-(--primary-container)"
        />
        <Tool
          name="Tailwind"
          description="Visual Systems"
          icon={
            <PaletteIcon className="w-6 h-6 text-(--on-secondary-container) text-2xl" />
          }
          color="bg-(--secondary-container)"
        />
        <Tool
          name="Node.js"
          description="Logic & Scale"
          icon={
            <TerminalIcon className="w-6 h-6 text-(--on-tertiary-container) text-2xl" />
          }
          color="bg-(--tertiary-container)"
        />
        <Tool
          name="MySQL"
          description="Data Management"
          icon={
            <DatabaseIcon className="w-6 h-6 text-(--on-surface) text-2xl" />
          }
          color="bg-(--surface-container-highest)"
        />
      </div>
    </section>
  );
};
