import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeDelta(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const min = Math.floor((seconds - hrs * 3600) / 60);
    const secs = Math.floor(seconds - hrs * 3600 - min * 60);
  const parts = [];
  if (hrs > 0) {
    parts.push(`${hrs}h`);
  }
  if (min > 0) {
    parts.push(`${min}m`);
  }
  if (secs > 0) {
    parts.push(`${secs}s`);
  }

  return parts.join(" ");
}
