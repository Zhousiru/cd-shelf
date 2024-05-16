'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function MainHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start -35vh', 'end 20vh'],
  })
  const opacity = useTransform(scrollYProgress, (input) => 1 - input)

  return (
    <>
      <motion.div
        className="fixed left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
        style={{ opacity }}
      >
        <div className="text-3xl">CD 架</div>
      </motion.div>
      <div ref={ref} className="h-[80vh]"></div>
    </>
  )
}
