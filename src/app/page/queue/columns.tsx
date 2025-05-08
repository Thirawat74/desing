import type { ColumnDef, Row } from "@tanstack/react-table"
import PaymentCellActionsWrapper from "./PaymentCellActionsWrapper"
import { StatusBadge } from "./status-badge"
import { PaymentBadge } from "./payment-badge"

export type Payment = {
  id: number
  name: string
  amount: number
  status: string
  payment: string
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
    header: "ชำระเงิน",
    accessorKey: "payment",
    enableSorting: true,
    cell: ({ row }: { row: Row<Payment> }) => {
      return <PaymentBadge payment={row.original.payment} />
    },
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<Payment> }) => {
      return <PaymentCellActionsWrapper row={row} />
    },
  },
]
