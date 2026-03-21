"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";
import { createPost } from "@/app/lib/actions";
import {
  Leaf,
  Settings,
  Trees,
  UploadCloud,
  Trash2,
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  Quote,
  Image as ImageIcon,
  Code,
  ChevronDown,
  Check,
  Save,
  Sprout,
} from "lucide-react";

export default function CreatePage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) {
        router.push("/auth/login");
      } else {
        setUser(user);
        setLoading(false);
      }
    }
    getUser();
  }, [router, supabase]);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBEF] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Trees className="w-12 h-12 text-[#2D391A]" />
          <p className="text-[#2D391A] font-medium uppercase tracking-widest text-xs">
            Fetching Forest Access...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBEF] text-[#171717] font-sans selection:bg-[#2D391A] selection:text-white flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b-[6px] border-[#2D391A]">
        <div className="flex items-center gap-2">
          <Trees className="w-8 h-8 text-[#2D391A]" />
          <div className="leading-tight">
            <h1 className="text-xl font-extrabold tracking-tight uppercase">
              Woodland
            </h1>
            <h1 className="text-xl font-extrabold tracking-tight uppercase -mt-1">
              Oversight
            </h1>
          </div>
        </div>
        <button className="flex items-center gap-1 font-bold text-sm tracking-wide transition-all hover:opacity-75">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 pt-10 pb-32 flex justify-center">
        <div className="w-full max-w-[450px]">
          {/* Card */}
          <div className="bg-white border-[3px] border-black rounded-[24px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 relative overflow-hidden">
            {/* Form Title */}
            <div className="flex items-center gap-3 mb-8">
              <Leaf className="w-8 h-8 text-[#2D391A] fill-[#2D391A]" />
              <h2 className="text-2xl font-[900] tracking-tight text-[#112311]">
                Create New Entry
              </h2>
            </div>

            <form
              action={async (formData) => {
                setIsSubmitting(true);
                // Construct final form data
                const finalFormData = new FormData();
                finalFormData.append("title", title);
                finalFormData.append("content", content);
                finalFormData.append("tags", tags.join(","));
                if (image) finalFormData.append("featuredImage", image);
                try {
                  await createPost(finalFormData);
                  router.push("/");
                } catch (error) {
                  alert("Error planting entry. Please try again.");
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-6"
            >
              {/* Blog Title */}
              <div className="space-y-2">
                <label className="text-[10px] font-[900] uppercase tracking-wider text-gray-500 block">
                  Blog Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="The Whisper of the Ancient O..."
                  required
                  className="w-full bg-[#F5F3E8] border-2 border-dashed border-black rounded-xl p-4 text-sm font-medium focus:outline-none placeholder:text-gray-400"
                />
              </div>
              {/* Tags */}
              <div className="space-y-2">
                <label className="text-[10px] font-[900] uppercase tracking-wider text-gray-500 block">
                  Tags
                </label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Add tags..."
                    className="w-full bg-[#F5F3E8] border-2 border-black rounded-xl p-4 text-sm font-medium focus:outline-none"
                  />
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center gap-1 bg-[#F5C299] border-2 border-black px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[11px] font-[800] tracking-wide"
                      >
                        <span>#{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:opacity-50 transition-opacity"
                        >
                          <span className="text-sm leading-none">×</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="space-y-2">
                <label className="text-[10px] font-[900] uppercase tracking-wider text-gray-500 block">
                  Featured Image
                </label>

                {/* Image Dropzone */}
                {!imagePreview ? (
                  <div className="relative group cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full border-2 border-dashed border-gray-400 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-[#FDFBEF] transition-colors group-hover:bg-[#F5F3E8] group-hover:border-black">
                      <div className="bg-[#2D391A] p-4 rounded-full text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:-translate-y-1">
                        <UploadCloud className="w-8 h-8" />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-sm tracking-tight text-[#171717]">
                          Drop your image here or browse
                        </p>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#F5F3E8] border-2 border-black rounded-xl p-3 flex items-center gap-3 relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="w-12 h-12 rounded-lg bg-black/10 overflow-hidden flex-shrink-0 border border-black/20">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-bold text-xs truncate text-[#171717]">
                        {image?.name}
                      </p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase">
                        {(image!.size / 1024 / 1024).toFixed(1)} MB • Uploaded
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center transition-all hover:bg-red-50 hover:text-red-500 active:translate-y-px"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <label className="text-[10px] font-[900] uppercase tracking-wider text-gray-500 block">
                  Content
                </label>
                <div className="border-2 border-black rounded-2xl bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {/* Toolbar */}
                  <div className="bg-[#F5F3E8] border-b-2 border-black p-3 flex flex-wrap gap-4 items-center">
                    <button type="button" className="hover:opacity-60">
                      <Bold className="w-4 h-4" />
                    </button>
                    <button type="button" className="hover:opacity-60">
                      <Italic className="w-4 h-4" />
                    </button>
                    <button type="button" className="hover:opacity-60">
                      <List className="w-4 h-4" />
                    </button>
                    <button type="button" className="hover:opacity-60">
                      <LinkIcon className="w-4 h-4" />
                    </button>
                    <button type="button" className="hover:opacity-60">
                      <Quote className="w-4 h-4" />
                    </button>
                    <button type="button" className="hover:opacity-60">
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <div className="block mt-2 w-full h-[1px] md:hidden"></div>
                    <button type="button" className="hover:opacity-60">
                      <Code className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start documenting the woods..."
                    required
                    className="w-full h-52 p-4 text-sm font-medium focus:outline-none resize-none bg-white placeholder:text-gray-300"
                  />
                </div>
              </div>

              {/* Status Footer */}
              <div className="flex items-center gap-2 pt-2">
                <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-green-600 stroke-[3]" />
                </div>
                <p className="text-[9px] font-[900] uppercase tracking-[0.1em] text-gray-400">
                  Auto-saved at 14:32
                </p>
              </div>

              {/* Hidden Original Button just in case of native form logic, but we use the fixed bar */}
              <button type="submit" id="submit-post" className="hidden">
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="bg-[#F5F3E8]/50 p-8 flex flex-col items-center gap-6 pb-40">
        <div className="flex items-center gap-6 text-gray-400">
          <Trees className="w-6 h-6" />
          <Sprout className="w-6 h-6" />
          <Leaf className="w-6 h-6" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-[9px] font-[900] uppercase tracking-[0.2em] text-gray-400">
            The Introvert Dev © 2026
          </p>
          <div className="flex gap-6 justify-center">
            {["Leaf Status", "Tree Map", "Sprout Growth"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] font-[900] uppercase tracking-wider text-gray-800 hover:opacity-60"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Bottom Fixed Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#FDFBEF] via-[#FDFBEF]/90 to-transparent flex justify-center gap-4 z-20">
        <button
          onClick={() => alert("Draft saved to roots.")}
          className="flex-1 max-w-[180px] bg-[#F5F3E8] border-2 border-dashed border-black rounded-2xl p-4 flex items-center justify-center gap-2 font-bold text-sm tracking-tight transition-transform hover:-rotate-1 active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
        >
          <Save className="w-5 h-5" />
          <div className="leading-none text-left">
            <div className="text-[10px] uppercase font-black opacity-50">
              Save
            </div>
            <div>Draft</div>
          </div>
        </button>
        <button
          onClick={() => document.getElementById("submit-post")?.click()}
          disabled={isSubmitting}
          className="flex-1 max-w-[180px] bg-[#2D391A] text-white border-2 border-black rounded-2xl p-4 flex items-center justify-center gap-2 font-bold text-sm tracking-tight transition-transform hover:rotate-1 active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Leaf className="w-5 h-5 fill-white" />
          )}
          <div className="leading-none text-left">
            <div className="text-[10px] uppercase font-black opacity-60">
              Plant
            </div>
            <div>Entry</div>
          </div>
        </button>
      </div>
    </div>
  );
}
