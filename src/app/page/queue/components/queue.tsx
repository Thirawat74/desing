"use client";

import { Payment, columns } from "../columns";
import { DataTable } from "../data-table";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// ✅ ดึงเฉพาะคอลัมน์ที่ใช้จริง ไม่ต้อง select("*")
async function getData(): Promise<Payment[]> {
  const { data, error } = await supabase
    .from("payments")
    .select("id, name, amount, status") // ✅ ปลอดภัยกว่า
    .order("id", { ascending: true });  // ✅ เรียงตาม id ให้สวยงาม

  if (error) {
    console.error("❌ Error fetching data from Supabase:", error);
    return [];
  }

  return data as Payment[];
}

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedData = await getData();
      console.log("✅ Fetched Data:", fetchedData);
      setData(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="containernicha mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-3 mb-5 text-center sm:text-left">
        <p className="font-bold text-primary">Queue Table</p>
        <h1 className="text-2xl font-bold">เช็คคิวของคุณได้ที่นี่</h1>
      </div>

      {/* 🌀 แสดงข้อความโหลดระหว่างรอข้อมูล */}
      {loading ? (
        <div className="text-center py-10 text-gray-400">กำลังโหลดข้อมูล...</div>
      ) : (
        <div className="w-full overflow-x-auto">
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
}
