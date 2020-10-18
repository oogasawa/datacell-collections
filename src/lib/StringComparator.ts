

import { Comparator } from "typescriptcollectionsframework";


export class StringComparator implements Comparator<any> {

    compare(o1: any, o2: any): number {
        const s1 = JSON.stringify(o1);
        const s2 = JSON.stringify(o2);
        if (s1 == s2) {
            return 0;
        }
        else if (s1 > s2) {
            return 1;
        }
        else {
            return -1;
        }
    }

}
