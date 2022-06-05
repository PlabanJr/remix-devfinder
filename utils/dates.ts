export const formatDate = (date: Date = new Date()) => {
    return new Date(date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric', })
}