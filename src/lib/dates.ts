import {
  addDays,
  format,
  differenceInSeconds,
  formatDistanceToNow,
  formatRelative,
} from "date-fns"

export const SECONDS_IN_DAY = 86400

/**
 * @example given past date "2025-04-12 21:32:58.647276"
 * returns "last Saturday at 5:32 PM"
 * @example given future date "2025-04-19 17:10:04.853"
 * returns "Saturday at 1:10 PM"
 */
export const formatToRelativeToNow = (date: Date): string => {
  return formatRelative(date, new Date())
}

/**
 * @example given past date "2025-04-12 21:32:58.647276"
 * returns "4 days ago"
 * @example given future date "2025-04-19 17:10:04.853"
 * returns "in 3 days"
 */
export const formatToDistanceToNow = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true })
}

/**
 * @example given past date "2025-04-12 21:32:58.647276"
 * returns "Saturday, April 12th, 2025"
 * @example given future date "2025-04-19 17:10:04.853"
 * returns "Saturday, April 19th, 2025"
 */
export const formatToLongFormDateString = (date: Date): string => {
  return format(date, "PPPP")
}

export const getDifferenceInSecondsToNow = (date: Date): number => {
  return differenceInSeconds(date, new Date())
}

export const getFutureDateFromNow = (nbDaysToAdd: number): Date => {
  return addDays(new Date(), nbDaysToAdd)
}
