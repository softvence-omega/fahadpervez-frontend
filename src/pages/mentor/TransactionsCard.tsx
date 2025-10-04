export default function TransactionsCard() {
  return (
    <div className="flex items-center justify-between border border-slate-300 p-4 rounded-[8px]">
      <div>
        <p className="max-w-[220px] text-[#0A0A0A]">
          Advanced Cardiology Case Studies with{" "}
          <span className="text-slate-600 underline"> James Wilson</span>
        </p>
        <p className="text-sm text-zinc-700">20/01/2024</p>
      </div>
      <div className="">
        <p className="text-green-700 font-medium">+$250.00 fee</p>
        <p className="bg-green-800 rounded-full text-white text-center mt-4 py-0.5">
          Complete
        </p>
      </div>
    </div>
  );
}
