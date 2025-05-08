"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  House,
  ChevronDown,
  ListOrdered,
  Wrench,
  ImagePlus,
  TicketPercent
} from "lucide-react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  const menu = [
    { name: "หน้าหลัก", link: "/", icon: <House size={18} /> },
    { name: "เช็คคิวงาน", link: "/page/queue", icon: <ListOrdered size={18} /> },
  ]

  const ProfileLinksMobile = [
    {
      name: "ฝากรูป",
      link: "/dashboard",
    },
    {
      name: "คำนวณโปรโมชั่น",
      link: "/dashboard",
    },
  ]

  return (
    <nav className="sticky top-0 left-0 w-full bg-navbar/90 border text-white backdrop-blur-lg z-50 transition-all duration-300">
      <div className="containernicha mx-auto flex items-center justify-between p-3">
        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-xl text-black cursor-default select-none"
          >
            <Link href={"/"}>
                <Image
                  src={"https://m1r.ai/FgCp2.png"}
                  alt="logo"
                  width={40}
                  height={40}
                  loading="lazy"
                  className="object-contain mx-auto rounded-lg hover:scale-105 transition-transform duration-300"
                />
            </Link>
          </motion.div>

          <div className="space-x-6 hidden lg:flex text-sm text-foreground justify-center items-center">
            <div className="h-6 border-l border-gray-300"></div>
            {menu.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={item.link}
                  className={`flex items-center gap-2 transition-all ease-in-out duration-300 ${
                    pathname === item.link
                      ? "text-primary font-medium scale-105"
                      : "hover:text-textnavbar hover:scale-105 group"
                  }`}
                >
                  <motion.div initial={{ rotate: 0 }} whileHover={{ rotate: 5 }} transition={{ duration: 0.2 }}>
                    {item.icon}
                  </motion.div>
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <AnimatePresence mode="wait">
            <motion.div
              key="user-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-4"
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    transition={{ duration: 0.2 }}
                    className="p-1 flex items-center space-x-2 rounded-lg bg-secondary hover:bg-secondary/80 border border-primary/40 text-foreground font-medium cursor-pointer hover:border-primary/80 transition-colors duration-300"
                  >
                    <Wrench className="text-primary" size={18} />
                    <span className="text-primary">เครื่องมือต่าง ๆ</span>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52 rounded-lg bg-background backdrop-blur-lg border">
                  <DropdownMenuItem
                    asChild
                    className="hover:bg-primary/10 cursor-pointer transition-colors duration-300"
                  >
                    <Link href="/page/upload">
                      <ImagePlus size={18} />
                      ฝากรูป
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    disabled
                    className="hover:bg-primary/10 cursor-pointer transition-colors duration-300"
                  >
                    <Link href="/page/calculate">
                      <TicketPercent size={18} />
                      คำนวณโปรโมชั่น
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </AnimatePresence>
        </div>

        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => {
                navigator.vibrate?.(50)
                setDrawerOpen(true)
              }}
              className="lg:hidden w-[40px] h-[40px] bg-navbarbtn text-foreground rounded-xl transition ease-in hover:bg-navbarbtn/60"
            >
              <i className="far fa-bars"></i>
            </motion.button>
          </DrawerTrigger>
          <DrawerContent className="bg-background">
            <DrawerHeader className="border-b">
              <DrawerTitle className="font-medium text-xl select-none text-center">Menu</DrawerTitle>
            </DrawerHeader>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4 text-sm max-w-sm mx-auto">
                {menu.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.link}
                      onClick={() => navigator.vibrate?.(50)}
                      className={`flex items-center border gap-3 p-2 rounded-lg transition-all duration-300 group hover:scale-102 ${
                        pathname === item.link
                          ? "bg-primary/30 text-primary border-primary/40"
                          : "bg-primary/10 hover:bg-primary/20 hover:border-primary/40 text-foreground"
                      }`}
                    >
                      <motion.span
                        whileHover={{ rotate: 5 }}
                        className="bg-background border p-2 duration-300 transition-all rounded-md"
                      >
                        {item.icon}
                      </motion.span>
                      <span className="font-medium duration-300">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div className="py-3 flex flex-col items-center text-sm max-w-sm mx-auto">
                  <div className="w-full flex items-center mb-3">
                    <Separator className="flex-1 mr-6" />
                    <span className="text-foreground">Tools</span>
                    <Separator className="flex-1 ml-6" />
                  </div>

                  <Card className="w-full bg-primary/10 border">
                    <CardContent className="p-1">
                      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full border border-1 flex items-center justify-between p-5 text-foreground bg-primary/20 hover:bg-primary/10 transition-colors duration-300"
                          >
                            <span className="bg-background text-primary border p-2 duration-300 transition-all rounded-md">
                              <Wrench />
                            </span>
                            <span className="flex items-center gap-2">
                              <span className="text-primary">เครื่องมือต่าง ๆ</span>
                            </span>
                            <ChevronDown
                              className={`h-4 w-4 opacity-70 transition-transform duration-300 ease-in-out ${
                                isOpen ? "transform rotate-180" : ""
                              }`}
                            />
                          </Button>
                        </CollapsibleTrigger>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              key="collapsible-content"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                              }}
                              className="overflow-hidden"
                            >
                              <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={{
                                  hidden: { opacity: 0, y: -10, scale: 0.95 },
                                  visible: {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
                                  },
                                  exit: {
                                    opacity: 0,
                                    y: 10,
                                    scale: 0.95,
                                    transition: { staggerChildren: 0.05, staggerDirection: -1 },
                                  },
                                }}
                                className="grid grid-cols-2 gap-2 mt-2"
                              >
                                {ProfileLinksMobile.map((link) => (
                                  <motion.div
                                    key={link.name}
                                    variants={{
                                      hidden: { opacity: 0, y: -10, scale: 0.95 },
                                      visible: { opacity: 1, y: 0, scale: 1 },
                                      exit: { opacity: 0, y: 10, scale: 0.95 },
                                    }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <Link
                                      href={link.link}
                                      className="p-3 bg-primary/30 text-foreground hover:text-primary rounded-lg text-center flex flex-col items-center gap-2 hover:bg-primary/20 transition-all duration-300 hover:scale-[.98]"
                                    >
                                      <span>{link.name}</span>
                                    </Link>
                                  </motion.div>
                                ))}

                                <motion.div
                                  variants={{
                                    hidden: { opacity: 0, y: -10, scale: 0.95 },
                                    visible: { opacity: 1, y: 0, scale: 1 },
                                    exit: { opacity: 0, y: 10, scale: 0.95 },
                                  }}
                                  transition={{ duration: 0.3 }}
                                  className="col-span-2"
                                ></motion.div>
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Collapsible>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  )
}

export default Navbar

