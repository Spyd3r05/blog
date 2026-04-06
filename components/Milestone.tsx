interface MilestoneProps {
  year: string;
  title: string;
  description: string;
}
const Milestone = ({ year, title, description }: MilestoneProps) => {
  return (
    <div className="relative pl-10 pb-12">
      <div className="absolute -left-[14px] top-0 w-6 h-6 rounded-full bg-(--surface-container-highest) border-4 border-(--on-surface)"></div>
      <span className="font-label text-xs font-black text-(--secondary) tracking-widest uppercase mb-1 block">
        {year}
      </span>
      <h4 className="font-headline text-xl font-bold mb-2">{title}</h4>
      <p className="text-on-surface-variant max-w-lg">{description}</p>
    </div>
  );
};

export default Milestone;
