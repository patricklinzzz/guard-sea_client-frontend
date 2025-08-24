// --- 共用工具 ---
function toDate(dateStr) {
  return new Date(dateStr.replace(/-/g, '/')) // 兼容 Safari
}

function getWeekday(date) {
    const weekdays = ['日', '一', '二', '三', '四', '五', '六']
    return weekdays[date.getDay()]
}

function pad(n) {
    return String(n).padStart(2, '0')
}

// --- 各格式 ---
function formatDateOnly(dateStr) {
    const d = toDate(dateStr)
    return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`
    }

    function formatEventDate(start, end) {
    const startDate = toDate(start)
    const endDate = toDate(end)

    const sameDay =
        startDate.getFullYear() === endDate.getFullYear() &&
        startDate.getMonth() === endDate.getMonth() &&
        startDate.getDate() === endDate.getDate()

    if (sameDay) {
        return `${startDate.getFullYear()}.${pad(startDate.getMonth() + 1)}.${pad(
        startDate.getDate()
        )}(${getWeekday(startDate)}) ${pad(startDate.getHours())}:${pad(
        startDate.getMinutes()
        )} - ${pad(endDate.getHours())}:${pad(endDate.getMinutes())}`
    } else {
        return `${startDate.getFullYear()}.${pad(startDate.getMonth() + 1)}.${pad(
        startDate.getDate()
        )}(${getWeekday(startDate)}) ${pad(startDate.getHours())}:${pad(
        startDate.getMinutes()
        )} - ${endDate.getFullYear()}.${pad(endDate.getMonth() + 1)}.${pad(
        endDate.getDate()
        )}(${getWeekday(endDate)}) ${pad(endDate.getHours())}:${pad(
        endDate.getMinutes()
        )}`
    }
}

function formatDeadline(dateStr) {
    const d = toDate(dateStr)
    return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`
}

// --- 統一輸出 ---
// 傳入 event 物件，直接回傳所有格式
export function formatEventDates(event) {
    if (!event) return {}

    // 活動日期時間（假設資料庫有 start_date, end_date）
    const start = new Date(event.start_date)
    const end = new Date(event.end_date)

    // 截止日期
    const deadline = new Date(event.registration_close_date)

    // 輔助函式：補 0
    const pad = (n) => n.toString().padStart(2, '0')

    // 星期
    const weekdayMap = ['日','一','二','三','四','五','六']

    return {
        // 活動日期格式：2025.11.28
        date: `${start.getFullYear()}.${pad(start.getMonth() + 1)}.${pad(start.getDate())}`,

        // 活動日期時間格式：2025.11.28(六) 09:00 - 12:00
        dateTime: `${start.getFullYear()}.${pad(start.getMonth() + 1)}.${pad(start.getDate())}(${weekdayMap[start.getDay()]}) ${pad(start.getHours())}:${pad(start.getMinutes())} - ${pad(end.getHours())}:${pad(end.getMinutes())}`,

        // 截止日期格式：2025 年 11 月 23 日
        deadline: `${deadline.getFullYear()} 年 ${pad(deadline.getMonth() + 1)} 月 ${pad(deadline.getDate())} 日`
    }
}