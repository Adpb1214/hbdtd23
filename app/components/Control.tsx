import { Step } from "./BirthdayPage"


export default function Controls({
  step,
  goNext,
}: {
  step: Step
  goNext: () => void
}) {
  const labels = {
    decorate: "Decorate the Room",
    cake: "Bring the Cake",
    candles: "Add Candles",
    blow: "Blow the Candles",
    cut: "Cut the Cake",
  }

  if (step === "cut") return null

  return (
    <div className="absolute bottom-10 w-full flex justify-center">
      <button
        onClick={goNext}
        className="px-6 py-3 bg-pink-500 text-white rounded-full"
      >
        {labels[step]}
      </button>
    </div>
  )
}
