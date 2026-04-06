import Link from "next/link";

const ContactSection = () => {
  return (
    <section className="pb-20">
      <div className="bg-(--primary) text-(--on-primary) rounded-2xl p-10 relative overflow-hidden border-4 border-(--on-surface) shadow-[8px_8px_0px_0px_#1c1c17]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-(--primary-container) rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
        <div className="relative z-10 space-y-6">
          <h2 className="font-headline text-3xl font-bold">
            Have a project in mind or just want to talk?
          </h2>
          <p className="font-body opacity-80 max-w-xl text-lg">
            I'm always open to discussing web architecture, minimalism in
            design, or the best hiking trails in the PNW.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="#">
              <button className="bg-(--surface-container-lowest) text-(--primary) font-headline font-bold px-8 py-3 rounded-xl border-2 border-(--on-surface) shadow-[4px_4px_0px_0px_#1c1c17] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1c1c17] transition-all active:scale-95">
                Say Hello
              </button>
            </Link>
            <Link href="https://github.com/Spyd3r05">
              <button className="bg-transparent text-(--on-primary) font-headline font-bold px-8 py-3 rounded-xl border-2 border-(--on-primary) border-dashed hover:bg-(--on-primary) hover:text-(--primary) transition-all">
                View Github
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
