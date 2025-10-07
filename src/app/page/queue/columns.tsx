import type { ColumnDef, Row } from "@tanstack/react-table"
import PaymentCellActionsWrapper from "./PaymentCellActionsWrapper"
import { StatusBadge } from "./status-badge"

export type Payment = {
  id: number
  name: string
  amount: number
  status: string
  // ❌ ลบ property payment เพราะไม่ใช้แล้ว
}

export const columns: ColumnDef<Payment>[] = [
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
    cell: ({ row }) => (
      <span>{row.original.amount.toLocaleString("th-TH")} ฿</span>
    ),
  },
  {
    header: "สถานะ",
    accessorKey: "status",
    enableSorting: true,
    cell: ({ row }: { row: Row<Payment> }) => {
      return <StatusBadge status={row.original.status} />
    },
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<Payment> }) => {
      return <PaymentCellActionsWrapper row={row} />
    },
  },
]