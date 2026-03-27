import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";

const PostsGrid = ({
  post,
  isFeatured,
  index,
}: {
  post: any;
  isFeatured: boolean;
  index: number;
}) => {
  const getBadgeColor = (index: number) => {
    const colors = [
      "bg-[#b45330] text-white",
      "bg-[#3b5329] text-white",
      "bg-[#f0aa8a] text-black",
      "bg-white text-black",
    ];
    return colors[(index - 1) % colors.length];
  };
  return (
    <Link
      href={`/post/${post.id}`}
      key={post.id}
      className={`block group ${isFeatured ? "md:col-span-2" : "md:h-full"}`}
    >
      <article
        className={`border-[3px] border-[#1A1A1A] rounded-md shadow-[4px_4px_0px_0px_#1A1A1A] bg-[#FEFDFB] flex transition-transform active:translate-y-1 active:translate-x-1 active:shadow-none hover:-translate-y-1 ${isFeatured ? "flex-col md:flex-row" : "flex-col h-full"}`}
      >
        {/* Image Section */}
        <div
          className={`relative bg-gray-200 border-[#1A1A1A] ${isFeatured ? "w-full h-[220px] md:h-auto md:w-1/2 md:min-h-[340px] border-b-[3px] md:border-b-0 md:border-r-[3px]" : "w-full h-[220px] border-b-[3px]"}`}
        >
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className={`object-cover ${isFeatured ? "rounded-t-[3px] md:rounded-tr-none md:rounded-l-[3px]" : "rounded-t-[3px]"}`}
            />
          ) : (
            <div
              className={`w-full h-full bg-[#f4f1ea] ${isFeatured ? "rounded-t-[3px] md:rounded-tr-none md:rounded-l-[3px]" : "rounded-t-[3px]"}`}
            />
          )}

          {/* Floating Tag over image */}
          {isFeatured && (
            <div className="absolute top-4 left-4 bg-[#1A1A1A] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border-[2px] border-[#1A1A1A] shadow-sm">
              FEATURED
            </div>
          )}

          {!isFeatured && post.tags && post.tags.length > 0 && (
            <div
              className={`absolute bottom-3 right-3 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-[4px] border-[2px] border-[#1A1A1A] shadow-sm ${getBadgeColor(index)}`}
            >
              {post.tags[0].name}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div
          className={`flex flex-col ${isFeatured ? "p-5 md:p-10 md:w-1/2 md:justify-center" : "p-5 flex-1"}`}
        >
          {isFeatured && post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#a44b36] mb-3">
              <div className="w-1.5 h-1.5 bg-[#a44b36] rounded-full"></div>#
              {post.tags[0].name}
            </div>
          )}

          <h3
            className={`font-black leading-[1.15] tracking-tight text-[#1A1A1A] ${isFeatured ? "text-[22px] md:text-3xl lg:text-[34px] md:leading-[1.1]" : "text-[22px]"}`}
          >
            {post.title}
          </h3>

          <p
            className={`text-[#1A1A1A]/70 font-medium leading-relaxed mt-3 ${isFeatured ? "text-sm md:text-base md:line-clamp-4" : "text-sm line-clamp-2"}`}
          >
            {post.content}
          </p>

          <div className="mt-auto pt-6 w-full relative">
            <div className="w-full absolute top-0 left-0 border-t-[2px] border-dashed border-[#1A1A1A]/20"></div>
            <div className="flex justify-between items-center text-[#1A1A1A]/60 mt-3 relative">
              <span className="text-[11px] font-black uppercase tracking-wider">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
                {isFeatured &&
                  ` • ${Math.max(1, Math.ceil((post.content?.length || 0) / 1000))} min read`}
              </span>
              {isFeatured ? (
                <ArrowRight
                  className="w-5 h-5 text-[#1A1A1A]"
                  strokeWidth={2.5}
                />
              ) : (
                <ExternalLink
                  className="w-[18px] h-[18px] text-[#1A1A1A]"
                  strokeWidth={2.5}
                />
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PostsGrid;
