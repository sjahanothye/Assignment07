export const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/**
 * Converts English numbers or digit strings into Bengali digits
 */
export function toBengaliDigits(input: number | string | undefined | null): string {
  if (input === undefined || input === null) return "";
  const str = input.toString();
  return str.replace(/\d/g, (digit) => BENGALI_DIGITS[parseInt(digit, 10)]);
}

/**
 * Formats a price into Bengali currency string
 * e.g. 148 -> "১৪৮ টাকা"
 */
export function formatPrice(price: number | undefined | null): string {
  if (price === undefined || price === null) return "০ টাকা";
  return `${toBengaliDigits(price)} টাকা`;
}

/**
 * Converts English units to Bengali unit representations
 */
export function formatUnit(unit: string | undefined | null): string {
  if (!unit) return "প্রতি একক";
  const lower = unit.toLowerCase();
  if (lower === "kg" || lower === "কেজি") return "প্রতি কেজি";
  if (lower === "liter" || lower === "litre" || lower === "লিটার") return "প্রতি লিটার";
  if (lower === "dozen" || lower === "ডজন") return "প্রতি ডজন";
  if (lower === "piece" || lower === "পিস") return "প্রতি পিস";
  if (lower === "hali" || lower === "হালি") return "প্রতি হালি";
  if (lower === "gm" || lower === "gram") return "প্রতি গ্রাম";
  return `প্রতি ${unit}`;
}

/**
 * Returns formatted Bengali Date for display under the logo
 * e.g. "রবিবার, ১১ অক্টোবর ২০২৬"
 */
export function getFormattedBengaliDate(dateInput: Date = new Date()): string {
  const banglaDays = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
  const banglaMonths = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];

  const dayName = banglaDays[dateInput.getDay()];
  const day = toBengaliDigits(dateInput.getDate());
  const monthName = banglaMonths[dateInput.getMonth()];
  const year = toBengaliDigits(dateInput.getFullYear());

  return `${dayName}, ${day} ${monthName} ${year}`;
}

/**
 * Formats percentage change with sign and Bengali digits
 */
export function formatChange(pct: number): { text: string; dir: "up" | "down" | "flat" } {
  const abs = Math.abs(pct).toFixed(1);
  const bengaliVal = toBengaliDigits(abs);
  if (pct > 0) {
    return { text: `▲ ${bengaliVal}%`, dir: "up" };
  } else if (pct < 0) {
    return { text: `▼ ${bengaliVal}%`, dir: "down" };
  } else {
    return { text: `— ০.০%`, dir: "flat" };
  }
}
