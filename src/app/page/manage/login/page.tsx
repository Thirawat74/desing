"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const correctPassword = "xurora";

  const handleLogin = () => {
    if (password === correctPassword) {
      localStorage.setItem("admin-auth", "true");
      router.push("/page/manage/queue");
    } else {
      setError("รหัสผ่านไม่ถูกต้อง!"); 
    }
  };

  return (
    <div className="flex h-screen items-center justify-center container-nicha">
      <div className="w-full max-w-md p-8 space-y-4 bg-card rounded-xl shadow-md">
      <h1 className="text-xl font-semibold">เข้าสู่ระบบ</h1>
      <span className="text-md text-gray-500">โปรดเข้าสู่ระบบก่อนใช้งานหลังบ้าน !</span>
      <Input
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button className="w-full" onClick={handleLogin}>
          เข้าสู่ระบบ
        </Button>
      </div>
    </div>
  );
};

export default Login;
