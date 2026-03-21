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
  const tagsInput = formData.get("tags") as string; // comma-separated
  const file = formData.get("featuredImage") as File;

  let featuredImageUrl: string | null = null;

  // If a file was uploaded, upload to Supabase Storage
  if (file && file.size > 0) {
    const allowedTypes = [
      "images/jpeg",
      "images/png",
      "images/webp",
      "images/jph",
    ];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Invalid file type");
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      throw new Error("File too large. Maximum size is 5MB.");
    }

    //generate a unique filename to avoid collisions
    const fileExt = file.name.split(".").pop();
    const uniqueName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `post-images/${uniqueName}`;

    //upload to supabase storage
    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    // Get the public URL (if bucket is public)
    const { data: urlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(filePath);

    featuredImageUrl = urlData.publicUrl;
  }

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
      featuredImage: featuredImageUrl,
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
