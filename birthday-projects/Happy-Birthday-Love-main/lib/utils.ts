import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
// Template by Farhan Alam (github.com/FarhanAlam-Official)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
