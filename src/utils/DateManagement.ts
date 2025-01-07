/**
 * Get the expired date
 * @param date
 */
const expiredDate = (date: string): string => {
    const convertedDate = new Date(date)
    const currentDate = new Date()

    if (convertedDate < currentDate) {
        return 'expiré il y a ' + getDifferenceBetweenDates(convertedDate, currentDate) + ' jours'
    }
    return 'expire dans ' + getDifferenceBetweenDates(convertedDate, currentDate) + ' jours'
}

/**
 * Get the formatted date
 * @param date
 */
const getFormattedDate = (date: string): string => {
    const convertedDate = new Date(date)
    return convertedDate.toLocaleDateString()
}

/**
 * Get the difference between two dates
 * @param date1
 * @param date2
 */
const getDifferenceBetweenDates = (date1: Date, date2: Date) => {
    const diffTime = Math.abs(date1.getTime() - date2.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Compare two dates
 * @param date1
 * @param date2
 */
const compareDates = (date1, date2): boolean => {
    return date1 < date2
}

export { expiredDate, getFormattedDate, getDifferenceBetweenDates, compareDates }
