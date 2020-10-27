

/** Check if an array a1 is a subset of an array a2, compared as unordered sets.
 * 
 * @param a1
 * @param a2
 */
export function array_isSubset(a1: string[], a2: string[]): boolean {

    const s2: Set<string> = new Set<string>();

    for (let i = 0; i < a2.length; i++) {
        s2.add(a2[i]);
    }

    for (let i = 0; i < a1.length; i++) {
        if (!s2.has(a1[i])) {
            return false;
        }
    }
    return true;
}
