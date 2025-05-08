"use client";

import { Payment, columns } from "../columns";
import { DataTable } from "../data-table";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

async function getData(): Promise<Payment[]> {
  const { data, error } = await supabase.from("payments").select("*");

  if (error) {
    console.error("Error fetching data from Supabase:", error);
    return [];
  }

  return data as Payment[];
}

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();
      console.log("Fetched Data:", fetchedData);
      setData(fetchedData);
    };

    fetchData();
  }, []);

  return (
    <div className="containernicha mx-auto">
      <div className="mt-3 mb-3">
        <div>
          <p className="font-bold text-primary">Queue Table</p>
          <h1 className="text-2xl font-bold">เช็คคิวของคุณได้ที่นี่</h1>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
