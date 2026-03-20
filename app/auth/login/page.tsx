"use client";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { createUserInDb } from "@/app/lib/actions";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const supabase = createClient();

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (!error && data.user) {
      await createUserInDb(data.user.id!, data.user.email!);
      alert("Check your email for confirmation!");
    } else {
      setError(error?.message || "Something went wrong");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
  };

  const revealPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col gap-4 max-w-[500px] mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-300 rounded-md p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex gap-2">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={revealPassword}
            className="bg-blue-500 cursor-pointer text-white p-2 rounded-md"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <button
          type="button"
          className="bg-blue-500 cursor-pointer text-white p-2 rounded-md"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleSignUp}
          className="bg-green-500 cursor-pointer text-white p-2 rounded-md"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
