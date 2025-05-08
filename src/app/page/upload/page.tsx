import React from "react";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, } from "@/components/ui/card";
export const metadata: Metadata = {
  title: "Xurora Store - ฝากรูป",
};

function page() {
  return (
    <div className="containernicha mx-auto">
      <div className="mt-3">
        <div>
          <p className="font-bold text-primary">Upload image</p>
          <h1 className="text-2xl font-bold">ระบบฝากรูปฟรี</h1>
        </div>
        <div className="flex justify-center items-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardContent>
                <p className="text-center text-primary bg-background rounded-md p-1 border-primary text-xl"> !? ระบบฝากรูปยังไม่พร้อมในตอนนี้</p>
                <p className="mt-3 text-center">ขออภัยในความไม่สะดวกหวังว่าคุณจะได้ใช้งานระบบนี้จากทางเราในครั้งต่อไปนะ 😭</p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default page;
