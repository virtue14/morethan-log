export function formatDate(date: any, local: any) {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return ""

  const year = d.getUTCFullYear()
  const month = d.getUTCMonth() + 1
  const day = d.getUTCDate()

  if (local === "ko-KR") {
    return `${year}. ${month}. ${day}.`
  }

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  if (local === "en-US") {
    return `${monthNames[month - 1]} ${day}, ${year}`
  }

  const mm = `${month}`.padStart(2, "0")
  const dd = `${day}`.padStart(2, "0")
  return `${year}-${mm}-${dd}`
}
