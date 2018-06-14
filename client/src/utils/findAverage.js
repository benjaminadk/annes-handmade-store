export const findAverage = arr => {
    if(arr === [] || !arr ) return 0
    let total = 0
    arr.forEach(r => {
        total += r
    })
    return parseFloat((total / arr.length).toFixed(2))
}