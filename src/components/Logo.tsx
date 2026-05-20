import {
  Hexagon,
  Sparkles,
} from "lucide-react";

interface LogoProps {
  className?: string;
}

export default function Logo({
  className = "h-14",
}: LogoProps) {
  return (
    <div
      className={`flex items-center gap-3 ${className}`}
    >
      {/* Icon */}
      <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-600 border border-violet-500 shadow-sm">
        {/* Main shape */}
        <Hexagon
          className="w-7 h-7 text-white fill-white/10"
          strokeWidth={2.2}
        />

        {/* Small accent */}
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-xl bg-white border border-violet-200 flex items-center justify-center">
          <Sparkles
            className="w-3 h-3 text-violet-600"
            strokeWidth={2.5}
          />
        </div>

        {/* Bottom glow dot */}
        <div className="absolute bottom-2 w-2 h-2 rounded-full bg-white" />
      </div>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span className="text-violet-950 font-black text-xl tracking-tight">
          Innova
        </span>

        <span className="text-violet-600 font-black text-xl tracking-tight">
          Código
        </span>
      </div>
    </div>
  );
}