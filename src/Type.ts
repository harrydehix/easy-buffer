export type TypeParseFunction<JavascriptType, IsArray> = IsArray extends true ? 
    (buffer: Buffer, offset: number, gap: number, size: number) => JavascriptType
    :
    (buffer: Buffer, offset: number) => JavascriptType
;


export class Type<JavascriptType, IsArray extends boolean>{
    public readonly id: Symbol;
    private value?: JavascriptType;

    public readonly byteLength: number;
    public readonly isArray: IsArray;
    public readonly parse: TypeParseFunction<JavascriptType, IsArray>;
    public readonly encoding?: BufferEncoding;

    /** Creates a new type. Size is in bytes. */
    constructor(byteLength: number, isArray: IsArray, parse: TypeParseFunction<JavascriptType, IsArray>, encoding?: BufferEncoding){
        this.id = Symbol();
        this.parse = parse;
        this.isArray = isArray;
        this.byteLength = byteLength;
        this.encoding = encoding;
    }

    
}

/** Holds all supported "primitive" types. */
const Types = {
    INT8: new Type<number, false>(1, false, (buffer, offset) => buffer.readInt8(offset)),
    INT16_BE: new Type<number, false>(2, false, (buffer, offset) => buffer.readInt16BE(offset)),
    INT16_LE: new Type<number, false>(2, false, (buffer, offset) => buffer.readInt16LE(offset)),
    INT32_LE: new Type<number, false>(4, false, (buffer, offset) => buffer.readInt32LE(offset)),
    INT32_BE: new Type<number, false>(4, false, (buffer, offset) => buffer.readInt32BE(offset)),
    INT_LE: (byteLength: number) => new Type<number, false>(byteLength, false, (buffer, offset) => buffer.readIntLE(offset, byteLength)),
    INT_BE: (byteLength: number) => new Type<number, false>(byteLength, false, (buffer, offset) => buffer.readIntBE(offset, byteLength)),
    UINT8: new Type<number, false>(1, false, (buffer, offset) => buffer.readUInt8(offset)),
    UINT16_BE: new Type<number, false>(2, false, (buffer, offset) => buffer.readUInt16BE(offset)),
    UINT16_LE: new Type<number, false>(2, false, (buffer, offset) => buffer.readUInt16LE(offset)),
    UINT32_LE: new Type<number, false>(4, false, (buffer, offset) => buffer.readUInt32LE(offset)),
    UINT32_BE: new Type<number, false>(4, false, (buffer, offset) => buffer.readUInt32BE(offset)),
    UINT_LE: (byteLength: number) => new Type<number, false>(byteLength, false, (buffer, offset) => buffer.readUIntLE(offset, byteLength)),
    UINT_BE: (byteLength: number) => new Type<number, false>(byteLength, false, (buffer, offset) => buffer.readUIntBE(offset, byteLength)),
    BIG_INT64_BE: new Type<bigint, false>(8, false, (buffer, offset) => buffer.readBigInt64BE(offset)), 
    BIG_INT64_LE: new Type<bigint, false>(8, false, (buffer, offset) => buffer.readBigInt64LE(offset)), 
    BIG_UINT64_BE: new Type<bigint, false>(8, false, (buffer, offset) => buffer.readBigUInt64BE(offset)), 
    BIG_UINT_64_LE: new Type<bigint, false>(8, false, (buffer, offset) => buffer.readBigUInt64LE(offset)),
    DOUBLE_BE: new Type<number, false>(8, false, (buffer, offset) => buffer.readDoubleBE(offset)),
    DOUBLE_LE: new Type<number, false>(8, false, (buffer, offset) => buffer.readDoubleLE(offset)),
    FLOAT_BE: new Type<number, false>(4, false, (buffer, offset) => buffer.readFloatBE(offset)),
    FLOAT_LE: new Type<number, false>(4, false, (buffer, offset) => buffer.readFloatLE(offset)),
    /** A single bit. The index `0` points to the left most bit.  */
    BIT: (index: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7) => new Type<boolean, false>(1/8, false, (buffer, offset) => ((buffer.readUint8(offset) >> 7 - index) & 1) === 1),
    /** A string having the passed encoding. The passed length is the length of the whole string in bytes. */
    STRING: (byteLength: number, encoding?: BufferEncoding) => new Type<string, false>(byteLength, false, (buffer, offset) => buffer.toString(encoding, offset, offset + byteLength)),
    ARRAY: function <JSType>(type: Type<JSType, false>): Type<JSType[], true>{
        return new Type<JSType[], true>(type.byteLength, true, (buffer, offset, gap, size) => {
            let result: JSType[] = [];

            for(let i = 0; i < size; ++i){
                result[i] = type.parse(buffer, offset + i * (type.byteLength + gap));
            }
            
            return result;
        });
    },
};

export default Types;