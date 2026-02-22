"use client"
import { useState } from "react"
import Room from "./Room"
import Cake from "./Cake"
import Candles from "./Candles"
import Controls from "./Control"

export type Step =
  | "decorate"
  | "cake"
  | "candles"
  | "blow"
  | "cut"

export default function BirthdayExperience() {
  const [step, setStep] = useState<Step>("decorate")

  const goNext = () => {
    const order: Step[] = [
      "decorate",
      "cake",
      "candles",
      "blow",
      "cut",
    ]

    const currentIndex = order.indexOf(step)
    if (currentIndex < order.length - 1) {
      setStep(order[currentIndex + 1])
    }
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Room step={step} />
      <Cake step={step} />
      <Candles step={step} />
      <Controls step={step} goNext={goNext} />
      {step === "cut" && (
  <div className="absolute inset-0 flex items-center justify-center text-white text-4xl">
    🎉🎉🎉 Make a Wish! 🎉🎉🎉
  </div>
)}

    </div>
    
  )
}
