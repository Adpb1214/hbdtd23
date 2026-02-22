import { motion } from "framer-motion"
import { Step } from "./BirthdayPage"

export default function Cake({ step }: { step: Step }) {
  if (step === "decorate") return null

  return (
    <>
      {(step === "cake" ||
        step === "candles" ||
        step === "blow" ||
        step === "cut") && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute bottom-32 text-6xl"
        >
          🎂
        </motion.div>
      )}
    </>
  )
}
