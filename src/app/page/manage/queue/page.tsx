"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Row,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hook/use-media-query";
import { Pen, Trash2, LogOut, DiamondPlus, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export type Payment = {
  id: number;
  name: string;
  amount: number;
  status: string;
  payment: string;
};

const Admin = () => {
  const router = useRouter();

  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedRow, setSelectedRow] = useState<Payment | null>(null);
  
  const closeDialog = () => setDialogOpen(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("admin-auth");
    if (!isAuthenticated) {
      router.push("/page/queue");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin-auth");
    router.push("/page/manage/login");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("payments").select("*");
      if (error) {
        console.error("Error fetching data:", error.message);
      } else {
        setData(data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = async () => {
    if (selectedPaymentId !== null) {
      try {
        const { error } = await supabase
          .from("payments")
          .delete()
          .eq("id", selectedPaymentId);

        if (error) {
          console.error("Error deleting payment:", error.message);
        } else {
          setData((prevData) =>
            prevData.filter((payment) => payment.id !== selectedPaymentId)
          );
          setDialogOpen(false);
        }
      } catch (error) {
        console.error("Error deleting payment:", error);
      }
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    let badgeClass = "";
    let badgeColor = "";
    switch (status) {
      case "สำเร็จ":
        badgeClass =
          "border bg-violet-900 hover:bg-violet-900 border-violet-700 text-violet-400";
        badgeColor = "bg-violet-400";
        break;
      case "เกิดปัญหา":
        badgeClass =
          "border bg-red-900 hover:bg-red-900 border-red-700 text-red-400";
        badgeColor = "bg-red-400";
        break;
      case "กำลังดำเนินการ":
        badgeClass =
          "border bg-yellow-900 hover:bg-yellow-900 border-yellow-700 text-yellow-400";
        badgeColor = "bg-yellow-400";
        break;
      case "รอคิว":
        badgeClass =
          "border bg-sky-900 hover:bg-sky-900 border-sky-700 text-sky-400";
        badgeColor = "bg-sky-400";
        break;
      case "ไม่สำเร็จ":
        badgeClass =
          "border bg-gray-900 hover:bg-gray-900 border-gray-700 text-gray-400";
        badgeColor = "bg-gray-400";
        break;
    }
    return (
      <Badge className={`${badgeClass} px-2 py-1 transition-all duration-300`}>
        <span
          className={`w-2 h-2 rounded-full inline-block mr-2 ${badgeColor}`}
        ></span>
        {status}
      </Badge>
    );
  };

  const PaymentBadge = ({ payment }: { payment: string }) => {
    let badgeClass = "";
    let badgeColor = "";
    switch (payment) {
      case "ชำระเงินแล้ว":
        badgeClass =
          "border bg-green-900 hover:bg-green-900 border-green-700 text-green-400";
        badgeColor = "bg-green-400";
        break;
      case "ยังไม่ชำระเงิน":
        badgeClass =
          "border bg-red-900 hover:bg-red-900 border-red-700 text-red-400";
        badgeColor = "bg-red-400";
        break;
    }
    return (
      <Badge className={`${badgeClass} px-2 py-1 transition-all duration-300`}>
        <span
          className={`w-2 h-2 rounded-full inline-block mr-2 ${badgeColor}`}
        ></span>
        {payment}
      </Badge>
    );
  };

  const columns: ColumnDef<Payment>[] = [
    { 
      header: "ลำดับ", 
      accessorKey: "id",
      enableSorting: true,
    },
    { 
      header: "ชื่อ", 
      accessorKey: "name",
      enableSorting: true,
    },
    { 
      header: "จำนวน", 
      accessorKey: "amount",
      enableSorting: true,
    },
    {
      header: "สถานะ",
      accessorKey: "status",
      enableSorting: true,
      cell: ({ row }: { row: Row<Payment> }) => {
        return <StatusBadge status={row.original.status} />;
      },
    },
    {
      header: "ชำระเงิน",
      accessorKey: "payment",
      enableSorting: true,
      cell: ({ row }: { row: Row<Payment> }) => {
        return <PaymentBadge payment={row.original.payment} />;
      },
    },
    {
      header: "",
      id: "actions",
      cell: ({ row }: { row: Row<Payment> }) => {
        const openDialog = () => {
          setSelectedPaymentId(row.original.id);
          setDialogOpen(true);
        };

        const openDrawer = () => {
          setSelectedRow(row.original);
          setDrawerOpen(true);
        };

        return isDesktop ? (
          <div className="space-x-2">
            <Link href={`/page/manage/queue/edit/${row.original.id}`}>
              <Button variant="outline" className="h-8 w-8 p-0 transition-all duration-200 hover:bg-primary/20 hover:text-primary">
                <span className="sr-only">Edit Page</span>
                <Pen className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="destructive"
              className="h-8 w-8 p-0 transition-all duration-200 hover:bg-destructive/90"
              onClick={openDialog}
            >
              <span className="sr-only">Delete menu</span>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0 transition-all duration-200 hover:bg-primary/20 hover:text-primary"
              onClick={openDrawer}
            >
              <span className="sr-only">View Details</span>
              <Pen className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="containernicha mx-auto py-10"
      >
        <Card className="mb-6 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle>
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-blue">Manage Queue</p>
                  <h1 className="text-2xl font-bold">จัดการคิวลูกค้า</h1>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/page/manage/queue/create">
                    <Button className="transition-all duration-300 hover:shadow-md">
                      <DiamondPlus className="mr-2 h-4 w-4" />
                      สร้างคิวใหม่
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center border rounded-xl px-3 py-1 focus-within:ring-2 focus-within:ring-primary/50 transition-all duration-200">
                <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                <Input
                  placeholder="ค้นหาตามชื่อ..."
                  value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                  onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
                  className="border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border">
              <ScrollArea className="w-full h-full">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                          <TableRow key={index}>
                            {Array.from({ length: columns.length }).map((_, cellIndex) => (
                              <TableCell key={cellIndex}>
                                <Skeleton className="h-6 w-full" />
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : table.getRowModel().rows?.length ? (
                        <AnimatePresence>
                          {table.getRowModel().rows.map((row) => (
                            <motion.tr
                              key={row.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                            >
                              {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </TableCell>
                              ))}
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                          >
                            ไม่มีข้อมูล
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                แสดง {table.getRowModel().rows.length} รายการ จากทั้งหมด {data.length} รายการ
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="transition-all duration-200"
                >
                  ก่อนหน้า
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="transition-all duration-200"
                >
                  ถัดไป
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            className="mt-2 transition-all duration-300 hover:shadow-md" 
            variant="destructive" 
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            ออกจากระบบ
          </Button>
        </motion.div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="backdrop-blur-md sm:max-w-md">
            <DialogHeader>
              <DialogTitle>ยืนยันการลบ</DialogTitle>
              <DialogDescription>
                คุณต้องการลบรายการนี้หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col sm:flex-row sm:justify-end sm:space-x-2">
              <Button variant="outline" onClick={closeDialog} className="mb-2 sm:mb-0">
                ยกเลิก
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmDelete}
                className="transition-all duration-200 hover:bg-destructive/90"
              >
                ลบ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>รายละเอียดคิว</DrawerTitle>
              <DrawerDescription>
                ข้อมูลคิวและตัวเลือกการจัดการ
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              {selectedRow && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">ลำดับ</p>
                      <p className="text-lg font-semibold">{selectedRow.id}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">จำนวน</p>
                      <p className="text-lg font-semibold">{selectedRow.amount}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">ชื่อ</p>
                    <p className="text-lg font-semibold">{selectedRow.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">สถานะ</p>
                      <StatusBadge status={selectedRow.status} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">การชำระเงิน</p>
                      <PaymentBadge payment={selectedRow.payment} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DrawerFooter className="pt-2">
              {selectedRow && (
                <>
                  <Link href={`/page/manage/queue/edit/${selectedRow.id}`}>
                    <Button className="w-full">แก้ไข</Button>
                  </Link>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                      setSelectedPaymentId(selectedRow.id);
                      setDrawerOpen(false);
                      setDialogOpen(true);
                    }}
                  >
                    ลบ
                  </Button>
                </>
              )}
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">
                  ปิด
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </motion.div>
    </>
  );
};

export default Admin;
