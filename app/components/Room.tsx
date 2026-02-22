import { motion } from "framer-motion"
import { Step } from "./BirthdayPage"

export default function Room({ step }: { step: Step }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">

      {step !== "decorate" && (
        <>
          <motion.div
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            className="absolute top-10 text-4xl"
          >
            🎈🎉🎈
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-20 text-2xl text-white"
          >
            Happy Birthday!
          </motion.div>
        </>
      )}
    </div>
  )
}
