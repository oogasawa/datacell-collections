
import {
    HashMap,
    ImmutableSet,
    TreeSet,
    Comparator,
    JIterator
} from "typescriptcollectionsframework";


import { StringComparator } from "./StringComparator";




export class DuplicatedKeyUniqueValueHashMap<K, V> {

    entity: HashMap<K, TreeSet<V>>;


    constructor() {
        this.entity = new HashMap<K, TreeSet<V>>();
    }



    get(key: K): TreeSet<V> {
        return this.entity.get(key);
    }



    set(key: K, value: V): void {
        const valList = new TreeSet<V>(new StringComparator());
        valList.add(value);

        // preexisting values are removed and the new value is put.
        this.entity.put(key, valList);
    }


    put(key: K, value: V): void {

        if (this.entity.containsKey(key)) {
            const vs: TreeSet<V> = this.entity.get(key);
            if (vs.contains(value)) {
                return;
            }
            else {
                this.entity.get(key).add(value);
            }
        }
        else { // this map does not have the given key.
            const valList = new TreeSet<V>(new StringComparator());
            valList.add(value);
            this.entity.put(key, valList);
        }
    }


    clear(): void {
        this.entity.clear();
    }


    containsKey(key: K): boolean {
        return this.entity.containsKey(key);
    }



    getValues(key: K): V[] {
        const result: V[] = [];
        const set: TreeSet<V> = this.get(key);

        for (const iter: JIterator<V>
            = set.iterator();
            iter.hasNext();) {

            result.push(iter.next());
        }


        return result;
    }


    isEmpty(): boolean {
        return this.entity.isEmpty();
    }


    keySet(): ImmutableSet<K> {
        return this.entity.keySet();
    }


    removeKey(key: K): void {
        this.entity.remove(key);
    }


    size(): number {
        let result = 0;
        const ks: ImmutableSet<K> = this.entity.keySet();
        for (const iter: JIterator<K> = ks.iterator();
            iter.hasNext();) {

            const key: K = iter.next();
            const vs: TreeSet<V> = this.entity.get(key);
            for (const iter2: JIterator<V> = vs.iterator();
                iter2.hasNext(); iter2.next()) {

                result++;
            }
        }
        return result;
    }
}
