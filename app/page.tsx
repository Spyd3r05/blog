import { prisma } from "./lib/prisma";
export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mt-2 max-w-[800px] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      {posts.map((post) => {
        return (
          <div key={post.id} className="mb-4">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
            <small className="text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </small>
            <hr className="my-2" />
          </div>
        );
      })}
    </div>
  );
}
