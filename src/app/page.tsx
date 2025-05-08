import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Xurora Store - ยินดีต้อนรับ",
};

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div>
        <p className="text-5xl sm:text-7xl">ยินดีต้อนรับเข้าสู่</p>
        <span className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-violet-500 to-yellow-500 text-transparent bg-clip-text">
          Xurora Store
        </span>
        <div className="flex justify-center space-x-4 mt-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">เพิ่มเติม</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>เว็บนี้เอาไว้ทำอะไร ?</AlertDialogTitle>
                <AlertDialogDescription>
                  สวัสดีครับ ผมเจ้าของ Xurora Store เว็บนี้สร้างมาเพื่อเช็คคิวงานของคุณลูกค้าเพื่อให้ดูง่ายขึ้น และมีระบบฝากรูป ไว้สำหรับลูกค้าที่ร้านผมหรือคนอื่น ๆ ที่เข้ามาพบเจอก็สามารถใช้ได้แบบปกติเลยครับบ
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>เข้าใจแล้ว</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Link href='page/queue'>
          <Button>เช็คคิวงาน ?</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
