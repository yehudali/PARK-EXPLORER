//קובץ עזר שנוצר ע"י noshadcn 
// פונקצית עזר שמכניסה 2 יכולות 1.המרת רשימת ערכים למחרוזת 2. מיזוג מחלקות של טילווינד, למניעת קונפליקטים בעיצוב
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
