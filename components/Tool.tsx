interface ToolProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const Tool = ({ name, description, icon, color }: ToolProps) => {
  return (
    <div className="bg-(--surface-container-lowest) border-2 border-(--on-surface) p-6 rounded-lg shadow-[4px_4px_0px_0px_#1c1c17] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_#1c1c17] transition-all group">
      <div
        className={`w-12 h-12 ${color} rounded-md flex items-center justify-center mb-4 border-2 border-(--on-surface) group-hover:rotate-6 transition-transform`}
      >
        {icon}
      </div>
      <span className="font-headline font-bold text-lg">{name}</span>
      <p className="text-xs font-label uppercase tracking-tighter opacity-60">
        {description}
      </p>
    </div>
  );
};

export default Tool;
