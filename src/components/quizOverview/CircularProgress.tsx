interface CircularProgressProps {
  percentage: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
  return (
    <div className="relative w-32 h-32 mx-auto">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(#22c55e ${percentage * 3.6}deg, #e5e7eb 0deg)`,
        }}
      ></div>
      <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
      </div>
    </div>
  );
};

export default CircularProgress;
