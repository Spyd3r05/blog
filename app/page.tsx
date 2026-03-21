import { prisma } from "./lib/prisma";
import Link from "next/link";
import Image from "next/image";
export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      tags: true,
    },
  });

  return (
    <div className="mt-2 max-w-[800px] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      <Link
        href="/create"
        className="bg-blue-500 cursor-pointer text-white p-2 rounded-md"
      >
        Create Post
      </Link>
      {posts.map((post) => {
        return (
          <div key={post.id} className="mb-4">
            <Link href={`/post/${post.id}`}>
              <Image
                src={post.featuredImage || ""}
                alt={post.title}
                width={150}
                height={150}
                className="w-full h-auto rounded-lg"
              />
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-600">{post.content}</p>
              <small className="text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </small>
            </Link>

            <hr className="my-2" />
          </div>
        );
      })}
    </div>
  );
}
