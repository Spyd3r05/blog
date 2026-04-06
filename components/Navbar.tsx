import Link from "next/link";
import { TreePine, SquarePen } from "lucide-react";
const Navbar = () => {
  return (
    <header className="w-full border-b-[3px] border-[#1A1A1A] bg-[#F8F5F0]">
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between p-4 px-6 md:px-8">
        <Link href="/">
          <div className="flex items-center gap-2">
            <TreePine className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2.5} />
            <span className="font-black text-xl tracking-tight mt-1">
              THE INTROVERT DEV
            </span>
          </div>
        </Link>

        <div className="hidden md:flex gap-8 items-center text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]/70">
          <Link
            href="/portfolio"
            className="hover:text-black transition-colors"
          >
            Portfolio
          </Link>
          <Link href="#" className="hover:text-black transition-colors">
            Blogs
          </Link>
          <Link href="#" className="hover:text-black transition-colors">
            Contact Me
          </Link>
        </div>

        <Link
          href="/create"
          className="text-[#1A1A1A] hover:opacity-70 transition-opacity"
          title="Create Post"
        >
          <SquarePen className="w-5 h-5" strokeWidth={2.5} />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
