/**
 * This utility function returns a chunk of initial Array according to
 * page number (needed indexes of items of initial array)
 * and number of items thet fit that page
 * @param {Array} items
 * @param {number} pageNumber
 * @param {number} pageSize
 * @returns new Array
 */
export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
}
