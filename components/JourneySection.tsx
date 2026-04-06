import Milestone from "./Milestone";

const JourneySection = () => {
  return (
    <section className="bg-(--surface-container-low) border-y-4 border-(--on-surface) -mx-6 px-6 py-16">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="space-y-2">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight">
            The Journey
          </h2>
          <p className="font-label uppercase tracking-widest text-(--secondary) text-sm font-bold">
            A linear history of growth
          </p>
        </div>
        <div className="space-y-0 border-l-4 border-(--primary) ml-4">
          <Milestone
            year="2026"
            title="Web Artisan"
            description="Helping local businesses establish their digital presence with performance-first static sites."
          />
          <Milestone
            year="2023"
            title="CS Major"
            description="Continuously learning and growing as a computer science student."
          />
          <Milestone
            year="2025"
            title="The First Line"
            description="Wrote my first 'Hello World' in Python on an old ThinkPad. Haven't looked back since."
          />
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
