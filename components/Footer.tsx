import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t-[3px] border-dashed border-[#1A1A1A]/20 py-8 px-6 mt-10 bg-[#F8F5F0]">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-4">
        <p className="text-[10px] font-black text-[#1A1A1A]/40 uppercase tracking-widest leading-[1.6]">
          © 2026 THE INTROVERT DEV —<br className="md:hidden" />
          <span className="hidden md:inline"> </span>STITCHED IN SOLITUDE
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-[10px] font-black uppercase text-[#1A1A1A]/40 tracking-widest">
          <Link
            href="/portfolio"
            className="hover:text-[#1A1A1A] transition-colors"
          >
            PORTFOLIO
          </Link>
          <Link href="#" className="hover:text-[#1A1A1A] transition-colors">
            BLOGS
          </Link>
          <Link href="#" className="hover:text-[#1A1A1A] transition-colors">
            CONTACT ME
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
