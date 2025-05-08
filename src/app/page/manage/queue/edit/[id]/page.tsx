"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabaseClient"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ChevronLeft, CircleAlert, CircleCheckBig, Loader2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"

function EditQueuePage() {
  const { toast } = useToast()
  const { id } = useParams()
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [payment, setPayment] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        if (id) {
          const { data, error } = await supabase.from("payments").select("*").eq("id", id).single()

          if (error) {
            console.error("Error fetching payment:", error.message)
            toast({
              description: (
                <div className="flex items-center gap-2 text-foreground">
                  <CircleAlert className="h-5 w-5 text-destructive" />
                  ไม่สามารถโหลดข้อมูลได้!
                </div>
              ),
              variant: "destructive",
            })
          } else if (data) {
            setName(data.name)
            setAmount(data.amount.toString())
            setPayment(data.payment)
            setStatus(data.status)
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          description: (
            <div className="flex items-center gap-2 text-foreground">
              <CircleAlert className="h-5 w-5 text-destructive" />
              เกิดข้อผิดพลาดในการโหลดข้อมูล!
            </div>
          ),
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    const isAuthenticated = localStorage.getItem("admin-auth")
    if (!isAuthenticated) {
      router.push("/page/queue")
    } else {
      fetchData()
    }
  }, [id, router, toast])

  const handleUpdateQueue = async () => {
    if (!name || !amount || !payment || !status) {
      toast({
        description: (
          <div className="flex items-center gap-2 text-foreground">
            <CircleAlert className="h-5 w-5 text-destructive" />
            กรุณากรอกข้อมูลให้ครบถ้วน!
          </div>
        ),
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase
        .from("payments")
        .update({
          name,
          amount: Number.parseFloat(amount),
          status,
          payment,
        })
        .eq("id", id)

      if (error) {
        console.error("Error updating queue:", error.message)
        toast({
          description: (
            <div className="flex items-center gap-2 text-foreground">
              <CircleAlert className="h-5 w-5 text-destructive" />
              เกิดข้อผิดพลาดในการอัปเดตคิว!
            </div>
          ),
          variant: "destructive",
        })
      } else {
        toast({
          description: (
            <div className="flex items-center gap-2 text-foreground">
              <CircleCheckBig className="h-5 w-5 text-green-500" />
              อัปเดตเสร็จแล้ว!
            </div>
          ),
        })

        // Redirect to queue list after short delay
        setTimeout(() => {
          router.push("/page/manage/queue")
        }, 1500)
      }
    } catch (err) {
      console.error("Unexpected error:", err)
      toast({
        description: (
          <div className="flex items-center gap-2 text-foreground">
            <CircleAlert className="h-5 w-5 text-destructive" />
            เกิดข้อผิดพลาด!
          </div>
        ),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="containernicha mx-auto py-10"
    >
      <div className="flex justify-center items-center">
        <Card className="w-full max-w-[700px] shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-primary">Manage Queue</p>
                <CardTitle className="text-2xl font-bold">แก้ไขคิว</CardTitle>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/page/manage/queue">
                  <Button variant="outline" className="transition-all duration-300 hover:shadow-sm">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    กลับ
                  </Button>
                </Link>
              </motion.div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-5 mt-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleUpdateQueue()
                }}
                className="space-y-5 mt-4"
              >
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      ชื่อ TICKET
                    </Label>
                    <Input
                      id="name"
                      className="bg-background transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/50"
                      type="text"
                      placeholder="ชื่อ TICKET"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-sm font-medium">
                      จำนวน
                    </Label>
                    <Input
                      id="amount"
                      className="bg-background transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/50"
                      type="number"
                      placeholder="จำนวน"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium">
                      สถานะ
                    </Label>
                    <Select value={status} onValueChange={(value) => setStatus(value)}>
                      <SelectTrigger
                        id="status"
                        className="bg-background transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                      >
                        <SelectValue placeholder="เลือกสถานะงาน" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="สำเร็จ">
                            <Badge className="border bg-violet-900 hover:bg-violet-900 border-violet-700 text-violet-400">
                              <span className="w-2 h-2 rounded-full bg-violet-400 inline-block mr-2"></span>
                              สำเร็จ
                            </Badge>
                          </SelectItem>
                          <SelectItem value="เกิดปัญหา">
                            <Badge className="border bg-red-900 hover:bg-red-900 border-red-700 text-red-400">
                              <span className="w-2 h-2 rounded-full bg-red-400 inline-block mr-2"></span>
                              เกิดปัญหา
                            </Badge>
                          </SelectItem>
                          <SelectItem value="กำลังดำเนินการ">
                            <Badge className="border bg-yellow-900 hover:bg-yellow-900 border-yellow-700 text-yellow-400">
                              <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block mr-2"></span>
                              กำลังดำเนินการ
                            </Badge>
                          </SelectItem>
                          <SelectItem value="รอคิว">
                            <Badge className="border bg-sky-900 hover:bg-sky-900 border-sky-700 text-sky-400">
                              <span className="w-2 h-2 rounded-full bg-sky-400 inline-block mr-2"></span>
                              รอคิว
                            </Badge>
                          </SelectItem>
                          <SelectItem value="ไม่สำเร็จ">
                            <Badge className="border bg-gray-900 hover:bg-gray-900 border-gray-700 text-gray-400">
                              <span className="w-2 h-2 rounded-full bg-gray-400 inline-block mr-2"></span>
                              ไม่สำเร็จ
                            </Badge>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payment" className="text-sm font-medium">
                      การชำระเงิน
                    </Label>
                    <Select value={payment} onValueChange={(value) => setPayment(value)}>
                      <SelectTrigger
                        id="payment"
                        className="bg-background transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                      >
                        <SelectValue placeholder="เลือกสถานะชำระเงิน" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="ชำระเงินแล้ว">
                            <Badge className="border bg-green-900 hover:bg-green-900 border-green-700 text-green-400">
                              <span className="w-2 h-2 rounded-full bg-green-400 inline-block mr-2"></span>
                              ชำระเงินแล้ว
                            </Badge>
                          </SelectItem>
                          <SelectItem value="ยังไม่ชำระเงิน">
                            <Badge className="border bg-red-900 hover:bg-red-900 border-red-700 text-red-400">
                              <span className="w-2 h-2 rounded-full bg-red-400 inline-block mr-2"></span>
                              ยังไม่ชำระเงิน
                            </Badge>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button
                    type="submit"
                    className="w-full transition-all duration-300 hover:shadow-md"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> กำลังอัปเดต...
                      </>
                    ) : (
                      "อัปเดตคิว"
                    )}
                  </Button>
                </motion.div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

export default EditQueuePage
