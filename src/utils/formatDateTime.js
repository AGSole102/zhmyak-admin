import dayjs from "dayjs";

export function formatDateTime(dateString) {
  if (!dateString) return "-";
  return dayjs(dateString).format("DD.MM.YYYY HH:mm");
} 