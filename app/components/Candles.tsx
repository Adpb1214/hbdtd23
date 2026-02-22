import { motion } from "framer-motion"
import { Step } from "./BirthdayPage"

export default function Candles({ step }: { step: Step }) {
  if (step === "candles" || step === "blow" || step === "cut") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-44 text-4xl"
      >
        🕯️🕯️🕯️
      </motion.div>
    )
  }

  return null
}
