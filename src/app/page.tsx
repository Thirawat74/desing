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
  title: "XDVZ STUDIO - ยินดีต้อนรับ",
};

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div>
        <p className="text-5xl sm:text-7xl">ยินดีต้อนรับเข้าสู่</p>
        <span className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-blue-500 to-white-500 text-transparent bg-clip-text">
          XDVZ STUDIO
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
                  สวัสดีครับ ผมเจ้าของ XDVZ STUDIO เว็บนี้สร้างมาเพื่อความสะดวกสบายเช็คคิวงานของคุณลูกค้าเพื่อให้ดูง่ายขึ้น
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
