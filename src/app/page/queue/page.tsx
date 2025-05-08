import React from 'react'
import Queue from '../queue/components/queue'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "XDVZ STUDIO - ตรวจสอบคิว",
};

function page() {
  return (
    <div>
      <Queue/>
    </div>
  )
}

export default page