export const formatDate = date => new Date(date?.seconds*1000).toLocaleString("en-GB", {
    year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
})

export const getTimer = timestamp => {
    const hours = String(new Date(timestamp).getHours()).padStart(2, '0')
    const minutes = String(new Date(timestamp).getMinutes()).padStart(2, '0')
    // const seconds = String(new Date(timestamp).getSeconds()).padStart(2, '0')

    return hours + ':' + minutes
}
