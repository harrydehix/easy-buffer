export type ArrayParseEntryOptions = {
    $offset: number,
    $size: number,
    $itemByteLength: number,
}

export class ArrayParseEntry<T> extends Array<T>{
    $offset: number;
    $size: number;
    $itemByteLength: number;

    constructor(array: T, options: ArrayParseEntryOptions){
        super(array);
        this.$itemByteLength = options.$itemByteLength;
        this.$offset = options.$offset;
        this.$size = options.$size;
    }
}