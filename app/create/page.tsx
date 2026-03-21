import { createPost } from "@/app/lib/actions";
import { createServerComponentClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function CreatePage() {
  const supabase = await createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <form
      action={createPost}
      className="flex flex-col gap-4 max-w-[500px] mx-auto mt-4"
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="border border-gray-300 rounded-md p-2"
      />
      <input
        type="text"
        name="content"
        placeholder="Content"
        className="border border-gray-300 rounded-md p-2"
      />
      <input
        type="file"
        name="featuredImage"
        placeholder="Featured Image"
        className="border border-gray-300 rounded-md p-2"
      />
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        className="border border-gray-300 rounded-md p-2"
      />
      <button
        type="submit"
        className="bg-blue-500 cursor-pointer text-white p-2 rounded-md"
      >
        Create
      </button>
    </form>
  );
}
