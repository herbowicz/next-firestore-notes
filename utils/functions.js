export const formatDate = date => new Date(date?.seconds*1000).toLocaleString("en-GB", {
    year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
})