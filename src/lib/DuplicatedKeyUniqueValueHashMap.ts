


export class DuplicatedKeyUniqueValueHashMap<K, V> {


    entity: Map<K, Set<V>>;

    constructor() {
        this.entity = new Map();
    }


    get(key: K): Set<V> {
        return this.entity.get(key);
    }


    put(key: K, value: V): void {

        if (this.entity.has(key)) {
            const vs: Set<V> = this.entity.get(key);
            if (vs.has(value)) {
                return;
            }
            else {
                this.entity.get(key).add(value);
            }
        }
        else { // this map does not have the given key.
            const valList = new Set<V>();
            valList.add(value);
            this.entity.set(key, valList);
        }
    }


    clear(): void {
        this.entity.clear();
    }


    containsKey(key: K): boolean {
        return this.entity.has(key);
    }



    getValues(key: K): V[] {
        const result: V[] = [];
        const set: Set<V> = this.get(key);

        set.forEach((elem) => {
            result.push(elem);
        });

        return result;
    }


    isEmpty(): boolean {
        return this.entity.size === 0;
    }


    keySet(): Set<K> {
        const result = new Set<K>();
        const iter: IterableIterator<K> = this.entity.keys();
        let obj: IteratorResult<K> = iter.next();

        while (!obj.done) {
            result.add(obj.value);
            obj = iter.next();
        }

        return result;
    }


    removeKey(key: K): void {
        this.entity.delete(key);
    }


    /** Returns a number of (key, value) pairs in this map.
     */
    size(): number {
        let counter = 0;
        this.entity.forEach((v, k, m) => {
            this.entity.get(k).forEach((val) => {
                counter++;
            })
        });

        return counter;
    }


}
