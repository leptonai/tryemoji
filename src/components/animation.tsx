import { clsx } from "clsx";
import { Loader, PauseCircle, PlayCircle } from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
export interface AnimationConfig {
  step: number;
  min: number;
  max: number;
}

export const Animation: FC<{
  config: AnimationConfig;
  loading: boolean;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  setStrength: Dispatch<SetStateAction<number>>;
}> = ({ config, loading, setStrength, playing, setPlaying }) => {
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (playing) {
      interval = setInterval(() => {
        setStrength((prev) => {
          return prev + config.step > config.max
            ? config.min
            : prev + config.step;
        });
      }, 50);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [config.max, config.min, config.step, playing, setStrength]);
  return (
    <div
      className={clsx(
        "transition duration-75 delay-0 absolute inset-0 flex items-center justify-center text-zinc-100/0 hover:text-zinc-100/60",
      )}
    >
      <Loader
        className={clsx(
          "animate-spin w-4 h-4 text-white absolute z-10 top-2 right-2 transition-opacity duration-75 delay-200",
          loading ? "opacity-60" : "opacity-0",
        )}
      />
      <div
        onClick={() => setPlaying((prev) => !prev)}
        className="cursor-pointer"
      >
        {playing ? (
          <PauseCircle size={128}></PauseCircle>
        ) : (
          <PlayCircle size={128}></PlayCircle>
        )}
      </div>
    </div>
  );
};
