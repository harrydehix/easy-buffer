export type TypeType = "primitive" | "tuple" | "array";

export class Type<JavascriptType, Type extends TypeType> {
    public readonly id: Symbol;
    private value?: JavascriptType;

    public readonly name: string;
    public readonly byteLength: number;
    public readonly type: Type;
    public readonly read: (buffer: Buffer, offset: number) => JavascriptType;
    public readonly write: (
        buffer: Buffer,
        value: JavascriptType,
        offset: number
    ) => void;
    public readonly encoding?: BufferEncoding;
    public readonly size: number;
    public readonly gap: number;

    /** Creates a new type. Size is in bytes. */
    constructor(
        name: string,
        byteLength: number,
        type: Type,
        read: (buffer: Buffer, offset: number) => JavascriptType,
        write: (buffer: Buffer, value: JavascriptType, offset: number) => void,
        size = 0,
        gap = 0,
        encoding?: BufferEncoding
    ) {
        this.name = name;
        this.id = Symbol();
        this.type = type;
        this.byteLength = byteLength;
        this.encoding = encoding;
        this.size = size;
        this.gap = gap;
        this.read = read;
        this.write = write;
    }
}

/** Holds all supported "primitive" types. */
const Types = {
    INT8: new Type<number, "primitive">(
        "INT8",
        1,
        "primitive",
        (buffer, offset) => buffer.readInt8(offset),
        (buffer, value, offset) => buffer.writeInt8(value, offset)
    ),
    INT16_BE: new Type<number, "primitive">(
        "INT16_BE",
        2,
        "primitive",
        (buffer, offset) => buffer.readInt16BE(offset),
        (buffer, value, offset) => buffer.writeInt16BE(value, offset)
    ),
    INT16_LE: new Type<number, "primitive">(
        "INT16_LE",
        2,
        "primitive",
        (buffer, offset) => buffer.readInt16LE(offset),
        (buffer, value, offset) => buffer.writeInt16LE(value, offset)
    ),
    INT32_LE: new Type<number, "primitive">(
        "INT32_LE",
        4,
        "primitive",
        (buffer, offset) => buffer.readInt32LE(offset),
        (buffer, value, offset) => buffer.writeInt32LE(value, offset)
    ),
    INT32_BE: new Type<number, "primitive">(
        "INT32_BE",
        4,
        "primitive",
        (buffer, offset) => buffer.readInt32BE(offset),
        (buffer, value, offset) => buffer.writeInt32BE(value, offset)
    ),
    INT_LE: (byteCount: number) =>
        new Type<number, "primitive">(
            "INT_LE",
            byteCount,
            "primitive",
            (buffer, offset) => buffer.readIntLE(offset, byteCount),
            (buffer, value, offset) =>
                buffer.writeIntLE(value, offset, byteCount)
        ),
    INT_BE: (byteCount: number) =>
        new Type<number, "primitive">(
            "INT_BE",
            byteCount,
            "primitive",
            (buffer, offset) => buffer.readIntBE(offset, byteCount),
            (buffer, value, offset) =>
                buffer.writeIntBE(value, offset, byteCount)
        ),
    UINT8: new Type<number, "primitive">(
        "UINT8",
        1,
        "primitive",
        (buffer, offset) => buffer.readUInt8(offset),
        (buffer, value, offset) => buffer.writeUint8(value, offset)
    ),
    UINT16_BE: new Type<number, "primitive">(
        "UINT16_BE",
        2,
        "primitive",
        (buffer, offset) => buffer.readUInt16BE(offset),
        (buffer, value, offset) => buffer.writeUInt16BE(value, offset)
    ),
    UINT16_LE: new Type<number, "primitive">(
        "UINT16_LE",
        2,
        "primitive",
        (buffer, offset) => buffer.readUInt16LE(offset),
        (buffer, value, offset) => buffer.writeUint16LE(value, offset)
    ),
    UINT32_LE: new Type<number, "primitive">(
        "UINT32_LE",
        4,
        "primitive",
        (buffer, offset) => buffer.readUInt32LE(offset),
        (buffer, value, offset) => buffer.writeUint32LE(value, offset)
    ),
    UINT32_BE: new Type<number, "primitive">(
        "UINT32_BE",
        4,
        "primitive",
        (buffer, offset) => buffer.readUInt32BE(offset),
        (buffer, value, offset) => buffer.writeUInt32BE(value, offset)
    ),
    UINT_LE: (byteCount: number) =>
        new Type<number, "primitive">(
            "UINT_LE",
            byteCount,
            "primitive",
            (buffer, offset) => buffer.readUIntLE(offset, byteCount),
            (buffer, value, offset) =>
                buffer.writeUIntLE(value, offset, byteCount)
        ),
    UINT_BE: (byteCount: number) =>
        new Type<number, "primitive">(
            "UINT_BE",
            byteCount,
            "primitive",
            (buffer, offset) => buffer.readUIntBE(offset, byteCount),
            (buffer, value, offset) =>
                buffer.writeUIntBE(value, offset, byteCount)
        ),
    BIG_INT64_BE: new Type<bigint, "primitive">(
        "BIG_INT64_BE",
        8,
        "primitive",
        (buffer, offset) => buffer.readBigInt64BE(offset),
        (buffer, value, offset) => buffer.writeBigInt64BE(value, offset)
    ),
    BIG_INT64_LE: new Type<bigint, "primitive">(
        "BIG_INT64_LE",
        8,
        "primitive",
        (buffer, offset) => buffer.readBigInt64LE(offset),
        (buffer, value, offset) => buffer.writeBigInt64LE(value, offset)
    ),
    BIG_UINT64_BE: new Type<bigint, "primitive">(
        "BIG_UINT64_BE",
        8,
        "primitive",
        (buffer, offset) => buffer.readBigUInt64BE(offset),
        (buffer, value, offset) => buffer.writeBigUInt64BE(value, offset)
    ),
    BIG_UINT_64_LE: new Type<bigint, "primitive">(
        "BIG_UINT_64_LE",
        8,
        "primitive",
        (buffer, offset) => buffer.readBigUInt64LE(offset),
        (buffer, value, offset) => buffer.writeBigUint64LE(value, offset)
    ),
    DOUBLE_BE: new Type<number, "primitive">(
        "DOUBLE_BE",
        8,
        "primitive",
        (buffer, offset) => buffer.readDoubleBE(offset),
        (buffer, value, offset) => buffer.writeDoubleBE(value, offset)
    ),
    DOUBLE_LE: new Type<number, "primitive">(
        "DOUBLE_LE",
        8,
        "primitive",
        (buffer, offset) => buffer.readDoubleLE(offset),
        (buffer, value, offset) => buffer.writeDoubleLE(value, offset)
    ),
    FLOAT_BE: new Type<number, "primitive">(
        "FLOAT_BE",
        4,
        "primitive",
        (buffer, offset) => buffer.readFloatBE(offset),
        (buffer, value, offset) => buffer.writeFloatBE(value, offset)
    ),
    FLOAT_LE: new Type<number, "primitive">(
        "FLOAT_LE",
        4,
        "primitive",
        (buffer, offset) => buffer.readFloatLE(offset),
        (buffer, value, offset) => buffer.writeFloatLE(value, offset)
    ),
    /** A single bit. The index `0` points to the left most bit.
     *
     *  **Warning!**
     *  A bit has a length of 0. Use the gap option if you work with arrays (only integer offsets are supported).
     */
    BIT: (index: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7) =>
        new Type<boolean, "primitive">(
            "BIT",
            0,
            "primitive",
            (buffer, offset) =>
                ((buffer.readUint8(offset) >> (7 - index)) & 1) === 1,
            (buffer, value, offset) => {
                let byte = buffer.readUint8(offset);
                if (value) {
                    byte = byte | (0b1 << (7 - index));
                } else {
                    byte = byte | ~(0b1 << (7 - index));
                }
                buffer.writeUInt8(byte);
            }
        ),
    /** A string having the passed encoding. The passed length is the length of the whole string in bytes. */
    STRING: (byteLength: number = 0, encoding?: BufferEncoding) =>
        new Type<string, "primitive">(
            "STRING",
            byteLength,
            "primitive",
            (buffer, offset) =>
                buffer.toString(encoding, offset, offset + byteLength),
            (buffer, value, offset) => buffer.write(value, offset, encoding)
        ),
    ARRAY: function <JSType>(
        type: Type<JSType, any>,
        size: number,
        gap: number = 0
    ): Type<JSType[], "array"> {
        return new Type<JSType[], "array">(
            `ARRAY[${type.name}]`,
            type.byteLength * size,
            "array",
            (buffer, offset) => {
                let result: JSType[] = [];

                for (let i = 0; i < size; ++i) {
                    result[i] = type.read(
                        buffer,
                        offset + i * (type.byteLength + gap)
                    );
                }
                return result;
            },
            (buffer, value, offset) => {
                for (const item of value) {
                    type.write(buffer, item, offset);
                    offset += type.byteLength + gap;
                }
            },
            size,
            gap
        );
    },

    TUPLE_2: function <Type1, Type2>(
        type1: Type<Type1, any>,
        type2: Type<Type2, any>,
        gap: number = 0
    ): Type<[Type1, Type2], "tuple"> {
        return new Type<[Type1, Type2], "tuple">(
            `TUPLE_2[${type1.name}, ${type2.name}]`,
            type1.byteLength + type2.byteLength,
            "tuple",
            (buffer, offset) => {
                return [
                    type1.read(buffer, offset),
                    type2.read(buffer, offset + type1.byteLength + gap),
                ];
            },
            (buffer, value, offset) => {
                type1.write(buffer, value[0], offset);
                offset += type1.byteLength + gap;
                type2.write(buffer, value[1], offset);
            },
            2,
            gap
        );
    },

    TUPLE_3: function <Type1, Type2, Type3>(
        type1: Type<Type1, any>,
        type2: Type<Type2, any>,
        type3: Type<Type3, any>,
        gap: number = 0
    ): Type<[Type1, Type2, Type3], "tuple"> {
        return new Type<[Type1, Type2, Type3], "tuple">(
            `TUPLE_3[${type1.name}, ${type2.name}, ${type3.name}]`,
            type1.byteLength + type2.byteLength + type3.byteLength,
            "tuple",
            (buffer, offset) => {
                return [
                    type1.read(buffer, offset),
                    type2.read(buffer, offset + type1.byteLength + gap),
                    type3.read(
                        buffer,
                        offset + type1.byteLength + type2.byteLength + 2 * gap
                    ),
                ];
            },
            (buffer, value, offset) => {
                type1.write(buffer, value[0], offset);
                offset += type1.byteLength + gap;
                type2.write(buffer, value[1], offset);
                offset += type2.byteLength + gap;
                type3.write(buffer, value[2], offset);
            },
            3,
            gap
        );
    },

    TUPLE_4: function <Type1, Type2, Type3, Type4>(
        type1: Type<Type1, any>,
        type2: Type<Type2, any>,
        type3: Type<Type3, any>,
        type4: Type<Type4, any>,
        gap: number = 0
    ): Type<[Type1, Type2, Type3, Type4], "tuple"> {
        return new Type<[Type1, Type2, Type3, Type4], "tuple">(
            `TUPLE_4[${type1.name}, ${type2.name}, ${type3.name}, ${type4.name}]`,
            type1.byteLength +
                type2.byteLength +
                type3.byteLength +
                type4.byteLength,
            "tuple",
            (buffer, offset) => {
                return [
                    type1.read(buffer, offset),
                    type2.read(buffer, offset + type1.byteLength + gap),
                    type3.read(
                        buffer,
                        offset + type1.byteLength + type2.byteLength + 2 * gap
                    ),
                    type4.read(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            3 * gap
                    ),
                ];
            },
            (buffer, value, offset) => {
                type1.write(buffer, value[0], offset);
                offset += type1.byteLength + gap;
                type2.write(buffer, value[1], offset);
                offset += type2.byteLength + gap;
                type3.write(buffer, value[2], offset);
                offset += type3.byteLength + gap;
                type4.write(buffer, value[3], offset);
            },
            4,
            gap
        );
    },

    TUPLE_5: function <Type1, Type2, Type3, Type4, Type5>(
        type1: Type<Type1, any>,
        type2: Type<Type2, any>,
        type3: Type<Type3, any>,
        type4: Type<Type4, any>,
        type5: Type<Type5, any>,
        gap: number = 0
    ): Type<[Type1, Type2, Type3, Type4, Type5], "tuple"> {
        return new Type<[Type1, Type2, Type3, Type4, Type5], "tuple">(
            `TUPLE_5[${type1.name}, ${type2.name}, ${type3.name}, ${type4.name}, ${type5.name}]`,
            type1.byteLength +
                type2.byteLength +
                type3.byteLength +
                type4.byteLength +
                type5.byteLength,
            "tuple",
            (buffer, offset) => {
                return [
                    type1.read(buffer, offset),
                    type2.read(buffer, offset + type1.byteLength + gap),
                    type3.read(
                        buffer,
                        offset + type1.byteLength + type2.byteLength + 2 * gap
                    ),
                    type4.read(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            3 * gap
                    ),
                    type5.read(
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
            (buffer, value, offset) => {
                type1.write(buffer, value[0], offset);
                offset += type1.byteLength + gap;
                type2.write(buffer, value[1], offset);
                offset += type2.byteLength + gap;
                type3.write(buffer, value[2], offset);
                offset += type3.byteLength + gap;
                type4.write(buffer, value[3], offset);
                offset += type4.byteLength + gap;
                type5.write(buffer, value[4], offset);
            },
            5,
            gap
        );
    },

    TUPLE_6: function <Type1, Type2, Type3, Type4, Type5, Type6>(
        type1: Type<Type1, any>,
        type2: Type<Type2, any>,
        type3: Type<Type3, any>,
        type4: Type<Type4, any>,
        type5: Type<Type5, any>,
        type6: Type<Type6, any>,
        gap: number = 0
    ): Type<[Type1, Type2, Type3, Type4, Type5, Type6], "tuple"> {
        return new Type<[Type1, Type2, Type3, Type4, Type5, Type6], "tuple">(
            `TUPLE_6[${type1.name}, ${type2.name}, ${type3.name}, ${type4.name}, ${type5.name}, ${type6.name}]`,
            type1.byteLength +
                type2.byteLength +
                type3.byteLength +
                type4.byteLength +
                type5.byteLength +
                type6.byteLength,
            "tuple",
            (buffer, offset) => {
                return [
                    type1.read(buffer, offset),
                    type2.read(buffer, offset + type1.byteLength + gap),
                    type3.read(
                        buffer,
                        offset + type1.byteLength + type2.byteLength + 2 * gap
                    ),
                    type4.read(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            3 * gap
                    ),
                    type5.read(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            type4.byteLength +
                            4 * gap
                    ),
                    type6.read(
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
            (buffer, value, offset) => {
                type1.write(buffer, value[0], offset);
                offset += type1.byteLength + gap;
                type2.write(buffer, value[1], offset);
                offset += type2.byteLength + gap;
                type3.write(buffer, value[2], offset);
                offset += type3.byteLength + gap;
                type4.write(buffer, value[3], offset);
                offset += type4.byteLength + gap;
                type5.write(buffer, value[4], offset);
                offset += type5.byteLength + gap;
                type6.write(buffer, value[5], offset);
            },
            6,
            gap
        );
    },

    TUPLE_7: function <Type1, Type2, Type3, Type4, Type5, Type6, Type7>(
        type1: Type<Type1, any>,
        type2: Type<Type2, any>,
        type3: Type<Type3, any>,
        type4: Type<Type4, any>,
        type5: Type<Type5, any>,
        type6: Type<Type6, any>,
        type7: Type<Type7, any>,
        gap: number = 0
    ): Type<[Type1, Type2, Type3, Type4, Type5, Type6, Type7], "tuple"> {
        return new Type<
            [Type1, Type2, Type3, Type4, Type5, Type6, Type7],
            "tuple"
        >(
            `TUPLE_7[${type1.name}, ${type2.name}, ${type3.name}, ${type4.name}, ${type5.name}, ${type6.name}, ${type7.name}]`,
            type1.byteLength +
                type2.byteLength +
                type3.byteLength +
                type4.byteLength +
                type5.byteLength +
                type6.byteLength +
                type7.byteLength,
            "tuple",
            (buffer, offset) => {
                return [
                    type1.read(buffer, offset),
                    type2.read(buffer, offset + type1.byteLength + gap),
                    type3.read(
                        buffer,
                        offset + type1.byteLength + type2.byteLength + 2 * gap
                    ),
                    type4.read(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            3 * gap
                    ),
                    type5.read(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            type4.byteLength +
                            4 * gap
                    ),
                    type6.read(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            type4.byteLength +
                            type5.byteLength +
                            5 * gap
                    ),
                    type7.read(
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
            (buffer, value, offset) => {
                type1.write(buffer, value[0], offset);
                offset += type1.byteLength + gap;
                type2.write(buffer, value[1], offset);
                offset += type2.byteLength + gap;
                type3.write(buffer, value[2], offset);
                offset += type3.byteLength + gap;
                type4.write(buffer, value[3], offset);
                offset += type4.byteLength + gap;
                type5.write(buffer, value[4], offset);
                offset += type5.byteLength + gap;
                type6.write(buffer, value[5], offset);
                offset += type6.byteLength + gap;
                type7.write(buffer, value[6], offset);
            },
            7,
            gap
        );
    },

    TUPLE_8: function <Type1, Type2, Type3, Type4, Type5, Type6, Type7, Type8>(
        type1: Type<Type1, any>,
        type2: Type<Type2, any>,
        type3: Type<Type3, any>,
        type4: Type<Type4, any>,
        type5: Type<Type5, any>,
        type6: Type<Type6, any>,
        type7: Type<Type7, any>,
        type8: Type<Type8, any>,
        gap: number = 0
    ): Type<[Type1, Type2, Type3, Type4, Type5, Type6, Type7, Type8], "tuple"> {
        return new Type<
            [Type1, Type2, Type3, Type4, Type5, Type6, Type7, Type8],
            "tuple"
        >(
            `TUPLE_8[${type1.name}, ${type2.name}, ${type3.name}, ${type4.name}, ${type5.name}, ${type6.name}, ${type7.name}, ${type8.name}]`,
            type1.byteLength +
                type2.byteLength +
                type3.byteLength +
                type4.byteLength +
                type5.byteLength +
                type6.byteLength +
                type7.byteLength +
                type8.byteLength,
            "tuple",
            (buffer, offset) => {
                return [
                    type1.read(buffer, offset),
                    type2.read(buffer, offset + type1.byteLength + gap),
                    type3.read(
                        buffer,
                        offset + type1.byteLength + type2.byteLength + 2 * gap
                    ),
                    type4.read(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            3 * gap
                    ),
                    type5.read(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            type4.byteLength +
                            4 * gap
                    ),
                    type6.read(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            type4.byteLength +
                            type5.byteLength +
                            5 * gap
                    ),
                    type7.read(
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
                    type8.read(
                        buffer,
                        offset +
                            type1.byteLength +
                            type2.byteLength +
                            type3.byteLength +
                            type4.byteLength +
                            type5.byteLength +
                            type6.byteLength +
                            type7.byteLength +
                            7 * gap
                    ),
                ];
            },
            (buffer, value, offset) => {
                type1.write(buffer, value[0], offset);
                offset += type1.byteLength + gap;
                type2.write(buffer, value[1], offset);
                offset += type2.byteLength + gap;
                type3.write(buffer, value[2], offset);
                offset += type3.byteLength + gap;
                type4.write(buffer, value[3], offset);
                offset += type4.byteLength + gap;
                type5.write(buffer, value[4], offset);
                offset += type5.byteLength + gap;
                type6.write(buffer, value[5], offset);
                offset += type6.byteLength + gap;
                type7.write(buffer, value[6], offset);
                offset += type7.byteLength + gap;
                type8.write(buffer, value[7], offset);
            },
            8,
            gap
        );
    },
};

export default Types;
