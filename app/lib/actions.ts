"use server";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { createServerActionClient } from "@/app/lib/supabase/server";

export async function createPost(formData: FormData) {
  // Check authentication
  const supabase = await createServerActionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to create a post");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const featuredImage = formData.get("featuredImage") as string;
  const tagsInput = formData.get("tags") as string; // comma-separated

  if (!title || !content) {
    throw new Error("Title and Content required!");
  }

  //process tags
  const tagNames = tagsInput
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const tags = await Promise.all(
    tagNames.map(async (name) => {
      // Find or create each tag
      return prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name },
      });
    }),
  );

  await prisma.post.create({
    data: {
      title,
      content,
      featuredImage,
      userId: user.id,
      tags: {
        connect: tags.map((tag) => ({ id: tag.id })),
      },
    },
  });
  revalidatePath("/");
}

//fetch user from auth users to user table
export async function createUserInDb(userId: string, email: string) {
  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: { id: userId, email },
  });
}
