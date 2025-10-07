import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useMediaQuery } from "@/hook/use-media-query";
import Link from "next/link";
import Image from "next/image";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ✅ ใช้ type Payment เดียวกับ columns
import type { Payment } from "./columns";

const PaymentCellActionsWrapper = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  if (isDesktop) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>รายละเอียด</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="https://discord.gg/ZDXEmc9zwG">
                เข้าร่วม Discord
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={openDialog}>
              รายละเอียดเพิ่มเติม
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="backdrop-blur-md">
            <DialogHeader>
              <DialogTitle>รายละเอียด</DialogTitle>
              <DialogDescription>
                นี่คือรายละเอียดเพิ่มเติมของรายการนี้
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Image
                className="w-56 mx-auto rounded-lg"
                width={1170}
                height={1119}
                src="https://placehold.co/1170x1119"
                alt="ตัวอย่างสลิป"
              />
            </div>
            <Button onClick={closeDialog} className="mt-4">
              ปิด
            </Button>
          </DialogContent>
        </Dialog>
      </>
    );
  } else {
    return (
      <>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="backdrop-blur-md">
            <DrawerHeader className="text-left">
              <DrawerTitle>รายละเอียด</DrawerTitle>
              <DrawerDescription>เลือกตัวเลือกที่ต้องการ</DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <Link href="https://discord.gg/6CgH2wtfuZ">
                <Button variant="link" className="w-full mb-2">
                  เข้าร่วม Discord
                </Button>
              </Link>
              <Button className="w-full" onClick={openDialog}>
                รายละเอียดเพิ่มเติม
              </Button>
            </div>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">
                  ปิด
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="backdrop-blur-md">
            <DialogHeader>
              <DialogTitle>รายละเอียด</DialogTitle>
              <DialogDescription>
                นี่คือรายละเอียดเพิ่มเติมของรายการนี้
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Image
                className="w-56 mx-auto rounded-lg"
                width={984}
                height={1119}
                src="https://placehold.co/984x1119"
                alt="ตัวอย่างสลิป"
              />
            </div>
            <Button onClick={closeDialog} className="mt-4">
              ปิด
            </Button>
          </DialogContent>
        </Dialog>
      </>
    );
  }
};

export default PaymentCellActionsWrapper;