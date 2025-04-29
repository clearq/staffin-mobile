import dayjs from "dayjs"

export const yearMonthDate = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD')
}