import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  let badgeClass = ""
  let badgeColor = ""

  switch (status) {
    case "สำเร็จ":
      badgeClass = "border bg-violet-900 hover:bg-violet-900 border-violet-700 text-violet-400"
      badgeColor = "bg-violet-400"
      break
    case "เกิดปัญหา":
      badgeClass = "border bg-red-900 hover:bg-red-900 border-red-700 text-red-400"
      badgeColor = "bg-red-400"
      break
    case "กำลังดำเนินการ":
      badgeClass = "border bg-yellow-900 hover:bg-yellow-900 border-yellow-700 text-yellow-400"
      badgeColor = "bg-yellow-400"
      break
    case "รอคิว":
      badgeClass = "border bg-sky-900 hover:bg-sky-900 border-sky-700 text-sky-400"
      badgeColor = "bg-sky-400"
      break
    case "ไม่สำเร็จ":
      badgeClass = "border bg-gray-900 hover:bg-gray-900 border-gray-700 text-gray-400"
      badgeColor = "bg-gray-400"
      break
    default:
      badgeClass = "border bg-gray-900 hover:bg-gray-900 border-gray-700 text-gray-400"
      badgeColor = "bg-gray-400"
  }

  return (
    <Badge className={`${badgeClass} px-2 py-1 transition-all duration-300`}>
      <span className={`w-2 h-2 rounded-full inline-block mr-2 ${badgeColor}`}></span>
      {status}
    </Badge>
  )
}
