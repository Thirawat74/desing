import { Badge } from "@/components/ui/badge"

interface PaymentBadgeProps {
  payment: string
}

export function PaymentBadge({ payment }: PaymentBadgeProps) {
  let badgeClass = ""
  let badgeColor = ""

  switch (payment) {
    case "ชำระเงินแล้ว":
      badgeClass = "border bg-green-900 hover:bg-green-900 border-green-700 text-green-400"
      badgeColor = "bg-green-400"
      break
    case "ยังไม่ชำระเงิน":
      badgeClass = "border bg-red-900 hover:bg-red-900 border-red-700 text-red-400"
      badgeColor = "bg-red-400"
      break
    default:
      badgeClass = "border bg-gray-900 hover:bg-gray-900 border-gray-700 text-gray-400"
      badgeColor = "bg-gray-400"
  }

  return (
    <Badge className={`${badgeClass} px-2 py-1 transition-all duration-300`}>
      <span className={`w-2 h-2 rounded-full inline-block ${badgeColor}`}></span>
    </Badge>
  )
}
