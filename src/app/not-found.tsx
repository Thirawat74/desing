"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function Notfound() {
  const [memeUrl, setMemeUrl] = useState("");

  const fetchRandomMeme = async () => {
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&limit=1"
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setMemeUrl(data[0].url);
      } else {
        throw new Error("Failed to fetch meme");
      }
    } catch (error) {
      console.error("Error fetching meme:", error);
      setMemeUrl("https://placehold.co/951x559");
    }
  };

  useEffect(() => {
    fetchRandomMeme();
  }, []);

  return (
    <div className="flex items-center justify-center mt-10 text-center">
      <div>
        <p className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-violet-500 to-yellow-500 text-transparent bg-clip-text">
          404
        </p>
        <span className="text-2xl sm:text-2xl">ไม่พบหน้าที่คุณต้องการ</span>
        <div className="space-x-2">
          <Button
            className="mt-2"
            variant={"outline"}
            onClick={() => window.history.back()}
          >
            กลับไปหน้าที่แล้ว
          </Button>

          <Link href={"/"}>
            <Button className="mt-2">กลับไปยังหน้าหลัก</Button>
          </Link>
        </div>
        {memeUrl && (
          <Image
            className="w-72 rounded-lg mt-2"
            src={memeUrl}
            width={500}
            height={300}
            alt="Random Meme"
          />
        )}
      </div>
    </div>
  );
}

export default Notfound;
