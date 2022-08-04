import { DateTime } from "luxon"

export const getDateTimeFromDate = (date) => {
  return DateTime.now().diff(DateTime.fromISO(date), ["years"])
}