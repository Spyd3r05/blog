import Image from "next/image";
import { SchoolIcon } from "lucide-react";

import chibi from "../public/assets/Chibi.jpg";

export const HeroPortfolio = () => {
  return (
    <section className="relative">
      <div className="inline-block bg-(--secondary-container) text-(--on-secondary-container) px-4 py-1 mb-6 rounded-lg border-2 border-(--on-surface) font-label text-sm uppercase tracking-widest font-bold">
        Identity Profile v1.0
      </div>
      <h2 className="font-headline text-5xl md:text-7xl font-extrabold text-(--primary) leading-[0.9] tracking-tighter mb-8">
        Welcome to My <br />
        <span className="text-(--secondary) italic">Digital Burrow.</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-4 group relative">
          <div className="absolute inset-0 bg-(--on-surface) translate-x-1 translate-y-1 rounded-xl"></div>
          <div className="relative bg-(--surface-container-highest) border-4 border-(--on-surface) p-2 rounded-xl overflow-hidden aspect-[4/5]">
            <Image
              className="w-full h-full object-cover rounded-lg filter grayscale contrast-125 mix-blend-multiply opacity-90"
              src={chibi}
              alt="Chibi"
              fill
            />
          </div>
        </div>
        <div className="md:col-span-8 space-y-6">
          <div className="bg-(--surface-container) p-8 rounded-xl border-4 border-(--on-surface) shadow-[6px_6px_0px_0px_#1c1c17]">
            <h3 className="font-headline text-3xl font-bold mb-4">
              Nzivu Mueni
            </h3>
            <p className="font-label text-lg text-(--secondary) font-semibold mb-6 flex items-center gap-2">
              <SchoolIcon />
              CS Student @ Life-Long Learner
            </p>
            <div className="space-y-4 text-(--on-surface-variant) leading-relaxed text-lg">
              <p>
                I build lean, efficient digital tools from a cabin in the woods.
                My philosophy is rooted in "Digital Foraging"—finding the
                simplest, most sustainable solutions to complex architectural
                problems.
              </p>
              <p>
                When I'm not debugging React hooks, you'll find me exploring the
                world of AI or perfecting the art of a quiet morning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
