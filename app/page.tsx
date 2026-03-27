import { prisma } from "./lib/prisma";
import Link from "next/link";
import Footer from "@/components/Footer";
import PostsGrid from "@/components/PostsGrid";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      tags: true,
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Navbar />

      <main className="w-full max-w-5xl mx-auto px-6 md:px-8 pt-8 md:pt-14 pb-16 flex flex-col flex-1">
        <Hero />

        {/* divider section */}
        <div className="flex items-center gap-3 mt-14 mb-8 w-full">
          <div className="w-3 h-1 bg-[#1A1A1A]"></div>
          <h2 className="font-extrabold text-[15px] uppercase tracking-widest text-[#1A1A1A] whitespace-nowrap">
            THE LEDGER ENTRIES
          </h2>
          <div className="flex-grow border-b-[2px] border-dashed border-[#1A1A1A]/30 self-center h-0 relative top-[1px]"></div>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, i) => {
            const isFeatured = i === 0;
            return (
              <PostsGrid
                key={i}
                post={post}
                index={i}
                isFeatured={isFeatured}
              />
            );
          })}
        </div>

        {/* Action Button */}
        <Link
          href="#"
          className="mt-14 block w-full outline-none md:max-w-md md:mx-auto"
        >
          <div className="bg-[#1C2C1D] text-white font-black text-sm uppercase tracking-widest py-[18px] border-[3px] border-[#1A1A1A] rounded-md shadow-[4px_4px_0px_0px_#1A1A1A] text-center w-full transition-transform active:translate-y-[4px] active:translate-x-[4px] active:shadow-none hover:bg-black">
            DIG DEEPER INTO THE BLOGS
          </div>
        </Link>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
