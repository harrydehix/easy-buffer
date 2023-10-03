export type TypeType = "primitive" | "tuple" | "array";

export class Type<JavascriptType, Type extends TypeType> {
    public readonly id: Symbol;
    private value?: JavascriptType;

    public readonly byteLength: number;
    public readonly type: Type;
    public readonly parse: (buffer: Buffer, offset: number) => JavascriptType;
    public readonly encoding?: BufferEncoding;
    public readonly size: number;
    public readonly gap: number;

    /** Creates a new type. Size is in bytes. */
    constructor(
        byteLength: number,
        type: Type,
        parse: (buffer: Buffer, offset: number) => JavascriptType,
        size = 0,
        gap = 0,
        encoding?: BufferEncoding
    ) {
        this.id = Symbol();
        this.type = type;
        this.byteLength = byteLength;
        this.encoding = encoding;
        this.size = size;
        this.gap = gap;
        this.parse = parse;
    }
}

/** Holds all supported "primitive" types. */
const Types = {
    INT8: new Type<number, "primitive">(1, "primitive", (buffer, offset) =>
        buffer.readInt8(offset)
    ),
    INT16_BE: new Type<number, "primitive">(2, "primitive", (buffer, offset) =>
        buffer.readInt16BE(offset)
    ),
    INT16_LE: new Type<number, "primitive">(2, "primitive", (buffer, offset) =>
        buffer.readInt16LE(offset)
    ),
    INT32_LE: new Type<number, "primitive">(4, "primitive", (buffer, offset) =>
        buffer.readInt32LE(offset)
    ),
    INT32_BE: new Type<number, "primitive">(4, "primitive", (buffer, offset) =>
        buffer.readInt32BE(offset)
    ),
    INT_LE: (byteLength: number) =>
        new Type<number, "primitive">(
            byteLength,
            "primitive",
            (buffer, offset) => buffer.readIntLE(offset, byteLength)
        ),
    INT_BE: (byteLength: number) =>
        new Type<number, "primitive">(
            byteLength,
            "primitive",
            (buffer, offset) => buffer.readIntBE(offset, byteLength)
        ),
    UINT8: new Type<number, "primitive">(1, "primitive", (buffer, offset) =>
        buffer.readUInt8(offset)
    ),
    UINT16_BE: new Type<number, "primitive">(2, "primitive", (buffer, offset) =>
        buffer.readUInt16BE(offset)
    ),
    UINT16_LE: new Type<number, "primitive">(2, "primitive", (buffer, offset) =>
        buffer.readUInt16LE(offset)
    ),
    UINT32_LE: new Type<number, "primitive">(4, "primitive", (buffer, offset) =>
        buffer.readUInt32LE(offset)
    ),
    UINT32_BE: new Type<number, "primitive">(4, "primitive", (buffer, offset) =>
        buffer.readUInt32BE(offset)
    ),
    UINT_LE: (byteLength: number) =>
        new Type<number, "primitive">(
            byteLength,
            "primitive",
            (buffer, offset) => buffer.readUIntLE(offset, byteLength)
        ),
    UINT_BE: (byteLength: number) =>
        new Type<number, "primitive">(
            byteLength,
            "primitive",
            (buffer, offset) => buffer.readUIntBE(offset, byteLength)
        ),
    BIG_INT64_BE: new Type<bigint, "primitive">(
        8,
        "primitive",
        (buffer, offset) => buffer.readBigInt64BE(offset)
    ),
    BIG_INT64_LE: new Type<bigint, "primitive">(
        8,
        "primitive",
        (buffer, offset) => buffer.readBigInt64LE(offset)
    ),
    BIG_UINT64_BE: new Type<bigint, "primitive">(
        8,
        "primitive",
        (buffer, offset) => buffer.readBigUInt64BE(offset)
    ),
    BIG_UINT_64_LE: new Type<bigint, "primitive">(
        8,
        "primitive",
        (buffer, offset) => buffer.readBigUInt64LE(offset)
    ),
    DOUBLE_BE: new Type<number, "primitive">(8, "primitive", (buffer, offset) =>
        buffer.readDoubleBE(offset)
    ),
    DOUBLE_LE: new Type<number, "primitive">(8, "primitive", (buffer, offset) =>
        buffer.readDoubleLE(offset)
    ),
    FLOAT_BE: new Type<number, "primitive">(4, "primitive", (buffer, offset) =>
        buffer.readFloatBE(offset)
    ),
    FLOAT_LE: new Type<number, "primitive">(4, "primitive", (buffer, offset) =>
        buffer.readFloatLE(offset)
    ),
    /** A single bit. The index `0` points to the left most bit.  */
    BIT: (index: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7) =>
        new Type<boolean, "primitive">(
            1 / 8,
            "primitive",
            (buffer, offset) =>
                ((buffer.readUint8(offset) >> (7 - index)) & 1) === 1
        ),
    /** A string having the passed encoding. The passed length is the length of the whole string in bytes. */
    STRING: (byteLength: number, encoding?: BufferEncoding) =>
        new Type<string, "primitive">(
            byteLength,
            "primitive",
            (buffer, offset) =>
                buffer.toString(encoding, offset, offset + byteLength)
        ),
    ARRAY: function <JSType>(
        type: Type<JSType, any>,
        size: number,
        gap: number = 0
    ): Type<JSType[], "array"> {
        return new Type<JSType[], "array">(
            type.byteLength * size,
            "array",
            (buffer, offset) => {
                let result: JSType[] = [];

                for (let i = 0; i < size; ++i) {
                    result[i] = type.parse(
                        buffer,
                        offset + i * (type.byteLength + gap)
                    );
                }
                return result;
            },
            size,
            gap
        );
    },

    TUPLE_2: function <Type1, Type2>(
        type1: Type<Type1, "primitive">,
        type2: Type<Type2, "primitive">,
        gap: number = 0
    ): Type<[Type1, Type2], "tuple"> {
        return new Type<[Type1, Type2], "tuple">(
            type1.byteLength + type2.byteLength,
            "tuple",
            (buffer, offset) => {
                return [
                    type1.parse(buffer, offset),
                    type2.parse(buffer, offset + type1.byteLength + gap),
                ];
            },
            2,
            gap
        );
    },

    TUPLE_3: function <Type1, Type2, Type3>(
        type1: Type<Type1, "primitive">,
        type2: Type<Type2, "primitive">,
        type3: Type<Type3, "primitive">,
        gap: number = 0
    ): Type<[Type1, Type2, Type3], "tuple"> {
        return new Type<[Type1, Type2, Type3], "tuple">(
            type1.byteLength + type2.byteLength + type3.byteLength,
            "tuple",
            (buffer, offset) => {
                return [
                    type1.parse(buffer, offset),
                    type2.parse(buffer, offset + type1.byteLength + gap),
                    type3.parse(
                        buffer,
                        offset + type1.byteLength + type2.byteLength + 2 * gap
                    ),
                ];
            },
            3,
            gap
        );
    },

    TUPLE_4: function <Type1, Type2, Type3, Type4>(
        type1: Type<Type1, "primitive">,
        type2: Type<Type2, "primitive">,
        type3: Type<Type3, "primitive">,
        type4: Type<Type4, "primitive">,
        gap: number = 0
    ): Type<[Type1, Type2, Type3, Type4], "tuple"> {
        return new Type<[Type1, Type2, Type3, Type4], "tuple">(
            type1.byteLength +
                type2.byteLength +
                type3.byteLength +
                type4.byteLength,
            "tuple",
            (buffer, offset) => {
                return [
                    type1.parse(buffer, offset),
                    type2.parse(buffer, offset + type1.byteLength + gap),
                    type3.parse(
                        buffer,
                        offset + type1.byteLength + type2.byteLength + 2 * gap
                    ),
                    type4.parse(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            3 * gap
                    ),
                ];
            },
            4,
            gap
        );
    },

    TUPLE_5: function <Type1, Type2, Type3, Type4, Type5>(
        type1: Type<Type1, "primitive">,
        type2: Type<Type2, "primitive">,
        type3: Type<Type3, "primitive">,
        type4: Type<Type4, "primitive">,
        type5: Type<Type5, "primitive">,
        gap: number = 0
    ): Type<[Type1, Type2, Type3, Type4, Type5], "tuple"> {
        return new Type<[Type1, Type2, Type3, Type4, Type5], "tuple">(
            type1.byteLength +
                type2.byteLength +
                type3.byteLength +
                type4.byteLength +
                type5.byteLength,
            "tuple",
            (buffer, offset) => {
                return [
                    type1.parse(buffer, offset),
                    type2.parse(buffer, offset + type1.byteLength + gap),
                    type3.parse(
                        buffer,
                        offset + type1.byteLength + type2.byteLength + 2 * gap
                    ),
                    type4.parse(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            3 * gap
                    ),
                    type5.parse(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            type4.byteLength +
                            4 * gap
                    ),
                ];
            },
            5,
            gap
        );
    },

    TUPLE_6: function <Type1, Type2, Type3, Type4, Type5, Type6>(
        type1: Type<Type1, "primitive">,
        type2: Type<Type2, "primitive">,
        type3: Type<Type3, "primitive">,
        type4: Type<Type4, "primitive">,
        type5: Type<Type5, "primitive">,
        type6: Type<Type6, "primitive">,
        gap: number = 0
    ): Type<[Type1, Type2, Type3, Type4, Type5, Type6], "tuple"> {
        return new Type<[Type1, Type2, Type3, Type4, Type5, Type6], "tuple">(
            type1.byteLength +
                type2.byteLength +
                type3.byteLength +
                type4.byteLength +
                type5.byteLength +
                type6.byteLength,
            "tuple",
            (buffer, offset) => {
                return [
                    type1.parse(buffer, offset),
                    type2.parse(buffer, offset + type1.byteLength + gap),
                    type3.parse(
                        buffer,
                        offset + type1.byteLength + type2.byteLength + 2 * gap
                    ),
                    type4.parse(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            3 * gap
                    ),
                    type5.parse(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            type4.byteLength +
                            4 * gap
                    ),
                    type6.parse(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            type4.byteLength +
                            type5.byteLength +
                            5 * gap
                    ),
                ];
            },
            6,
            gap
        );
    },

    TUPLE_7: function <Type1, Type2, Type3, Type4, Type5, Type6, Type7>(
        type1: Type<Type1, "primitive">,
        type2: Type<Type2, "primitive">,
        type3: Type<Type3, "primitive">,
        type4: Type<Type4, "primitive">,
        type5: Type<Type5, "primitive">,
        type6: Type<Type6, "primitive">,
        type7: Type<Type7, "primitive">,
        gap: number = 0
    ): Type<[Type1, Type2, Type3, Type4, Type5, Type6, Type7], "array"> {
        return new Type<
            [Type1, Type2, Type3, Type4, Type5, Type6, Type7],
            "array"
        >(
            type1.byteLength +
                type2.byteLength +
                type3.byteLength +
                type4.byteLength +
                type5.byteLength +
                type6.byteLength +
                type7.byteLength,
            "array",
            (buffer, offset) => {
                return [
                    type1.parse(buffer, offset),
                    type2.parse(buffer, offset + type1.byteLength + gap),
                    type3.parse(
                        buffer,
                        offset + type1.byteLength + type2.byteLength + 2 * gap
                    ),
                    type4.parse(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            3 * gap
                    ),
                    type5.parse(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            type4.byteLength +
                            4 * gap
                    ),
                    type6.parse(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            type4.byteLength +
                            type5.byteLength +
                            5 * gap
                    ),
                    type7.parse(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            type4.byteLength +
                            type5.byteLength +
                            type6.byteLength +
                            6 * gap
                    ),
                ];
            },
            7,
            gap
        );
    },
};

export default Types;
