import { Type, TypeType } from "./Type";

type ElementType<T> = T extends (infer E)[] ? E : never;

type ChangeTupleType<T, NewType> = T extends [any, any]
    ? [NewType, NewType]
    : T extends [any, any, any]
    ? [NewType, NewType, NewType]
    : T extends [any, any, any, any]
    ? [NewType, NewType, NewType, NewType]
    : T extends [any, any, any, any, any]
    ? [NewType, NewType, NewType, NewType, NewType]
    : T extends [any, any, any, any, any, any]
    ? [NewType, NewType, NewType, NewType, NewType, NewType]
    : T extends [any, any, any, any, any, any, any]
    ? [NewType, NewType, NewType, NewType, NewType, NewType, NewType]
    : T extends [any, any, any, any, any, any, any, any]
    ? [NewType, NewType, NewType, NewType, NewType, NewType, NewType, NewType]
    : never;

type InjectNullToTuple<T> = T extends [infer Type1, infer Type2]
    ? [Type1 | null, Type2 | null]
    : T extends [infer Type1, infer Type2, infer Type3]
    ? [Type1 | null, Type2 | null, Type3 | null]
    : T extends [infer Type1, infer Type2, infer Type3, infer Type4]
    ? [Type1 | null, Type2 | null, Type3 | null, Type4 | null]
    : T extends [
          infer Type1,
          infer Type2,
          infer Type3,
          infer Type4,
          infer Type5
      ]
    ? [Type1 | null, Type2 | null, Type3 | null, Type4 | null, Type5 | null]
    : T extends [
          infer Type1,
          infer Type2,
          infer Type3,
          infer Type4,
          infer Type5,
          infer Type6
      ]
    ? [
          Type1 | null,
          Type2 | null,
          Type3 | null,
          Type4 | null,
          Type5 | null,
          Type6 | null
      ]
    : T extends [
          infer Type1,
          infer Type2,
          infer Type3,
          infer Type4,
          infer Type5,
          infer Type6,
          infer Type7
      ]
    ? [
          Type1 | null,
          Type2 | null,
          Type3 | null,
          Type4 | null,
          Type5 | null,
          Type6 | null,
          Type7 | null
      ]
    : T extends [
          infer Type1,
          infer Type2,
          infer Type3,
          infer Type4,
          infer Type5,
          infer Type6,
          infer Type7,
          infer Type8
      ]
    ? [
          Type1 | null,
          Type2 | null,
          Type3 | null,
          Type4 | null,
          Type5 | null,
          Type6 | null,
          Type7 | null,
          Type8 | null
      ]
    : never;

type InjectNullToTuplePartially<T, K> = T extends [infer Type1, infer Type2]
    ? K extends [infer ArrType1, infer ArrType2]
        ? [
              ArrType1 extends never[] ? Type1 : Type1 | null,
              ArrType2 extends never[] ? Type2 : Type2 | null
          ]
        : T extends [infer Type1, infer Type2, infer Type3]
        ? K extends [infer ArrType1, infer ArrType2, infer ArrType3]
            ? [
                  ArrType1 extends never[] ? Type1 : Type1 | null,
                  ArrType2 extends never[] ? Type2 : Type2 | null,
                  ArrType3 extends never[] ? Type3 : Type3 | null
              ]
            : T extends [infer Type1, infer Type2, infer Type3, infer Type4]
            ? K extends [
                  infer ArrType1,
                  infer ArrType2,
                  infer ArrType3,
                  infer ArrType4
              ]
                ? [
                      ArrType1 extends never[] ? Type1 : Type1 | null,
                      ArrType2 extends never[] ? Type2 : Type2 | null,
                      ArrType3 extends never[] ? Type3 : Type3 | null,
                      ArrType4 extends never[] ? Type4 : Type4 | null
                  ]
                : T extends [
                      infer Type1,
                      infer Type2,
                      infer Type3,
                      infer Type4,
                      infer Type5
                  ]
                ? K extends [
                      infer ArrType1,
                      infer ArrType2,
                      infer ArrType3,
                      infer ArrType4,
                      infer ArrType5
                  ]
                    ? [
                          ArrType1 extends never[] ? Type1 : Type1 | null,
                          ArrType2 extends never[] ? Type2 : Type2 | null,
                          ArrType3 extends never[] ? Type3 : Type3 | null,
                          ArrType4 extends never[] ? Type4 : Type4 | null,
                          ArrType5 extends never[] ? Type5 : Type5 | null
                      ]
                    : T extends [
                          infer Type1,
                          infer Type2,
                          infer Type3,
                          infer Type4,
                          infer Type5,
                          infer Type6
                      ]
                    ? K extends [
                          infer ArrType1,
                          infer ArrType2,
                          infer ArrType3,
                          infer ArrType4,
                          infer ArrType5,
                          infer ArrType6
                      ]
                        ? [
                              ArrType1 extends never[] ? Type1 : Type1 | null,
                              ArrType2 extends never[] ? Type2 : Type2 | null,
                              ArrType3 extends never[] ? Type3 : Type3 | null,
                              ArrType4 extends never[] ? Type4 : Type4 | null,
                              ArrType5 extends never[] ? Type5 : Type5 | null,
                              ArrType6 extends never[] ? Type6 : Type6 | null
                          ]
                        : T extends [
                              infer Type1,
                              infer Type2,
                              infer Type3,
                              infer Type4,
                              infer Type5,
                              infer Type6,
                              infer Type7
                          ]
                        ? K extends [
                              infer ArrType1,
                              infer ArrType2,
                              infer ArrType3,
                              infer ArrType4,
                              infer ArrType5,
                              infer ArrType6,
                              infer ArrType7
                          ]
                            ? [
                                  ArrType1 extends never[]
                                      ? Type1
                                      : Type1 | null,
                                  ArrType2 extends never[]
                                      ? Type2
                                      : Type2 | null,
                                  ArrType3 extends never[]
                                      ? Type3
                                      : Type3 | null,
                                  ArrType4 extends never[]
                                      ? Type4
                                      : Type4 | null,
                                  ArrType5 extends never[]
                                      ? Type5
                                      : Type5 | null,
                                  ArrType6 extends never[]
                                      ? Type6
                                      : Type6 | null,
                                  ArrType7 extends never[]
                                      ? Type7
                                      : Type7 | null
                              ]
                            : T extends [
                                  infer Type1,
                                  infer Type2,
                                  infer Type3,
                                  infer Type4,
                                  infer Type5,
                                  infer Type6,
                                  infer Type7,
                                  infer Type8
                              ]
                            ? K extends [
                                  infer ArrType1,
                                  infer ArrType2,
                                  infer ArrType3,
                                  infer ArrType4,
                                  infer ArrType5,
                                  infer ArrType6,
                                  infer ArrType7,
                                  infer ArrType8
                              ]
                                ? [
                                      ArrType1 extends never[]
                                          ? Type1
                                          : Type1 | null,
                                      ArrType2 extends never[]
                                          ? Type2
                                          : Type2 | null,
                                      ArrType3 extends never[]
                                          ? Type3
                                          : Type3 | null,
                                      ArrType4 extends never[]
                                          ? Type4
                                          : Type4 | null,
                                      ArrType5 extends never[]
                                          ? Type5
                                          : Type5 | null,
                                      ArrType6 extends never[]
                                          ? Type6
                                          : Type6 | null,
                                      ArrType7 extends never[]
                                          ? Type7
                                          : Type7 | null,
                                      ArrType8 extends never[]
                                          ? Type8
                                          : Type8 | null
                                  ]
                                : never
                            : never
                        : never
                    : never
                : never
            : never
        : never
    : never;

type InferTuple<T> = T extends [infer Type1, infer Type2]
    ? [Type1, Type2]
    : T extends [infer Type1, infer Type2, infer Type3]
    ? [Type1, Type2, Type3]
    : T extends [infer Type1, infer Type2, infer Type3, infer Type4]
    ? [Type1, Type2, Type3, Type4]
    : T extends [
          infer Type1,
          infer Type2,
          infer Type3,
          infer Type4,
          infer Type5
      ]
    ? [Type1, Type2, Type3, Type4, Type5]
    : T extends [
          infer Type1,
          infer Type2,
          infer Type3,
          infer Type4,
          infer Type5,
          infer Type6
      ]
    ? [Type1, Type2, Type3, Type4, Type5, Type6]
    : T extends [
          infer Type1,
          infer Type2,
          infer Type3,
          infer Type4,
          infer Type5,
          infer Type6,
          infer Type7
      ]
    ? [Type1, Type2, Type3, Type4, Type5, Type6, Type7]
    : T extends [
          infer Type1,
          infer Type2,
          infer Type3,
          infer Type4,
          infer Type5,
          infer Type6,
          infer Type7,
          infer Type8
      ]
    ? [Type1, Type2, Type3, Type4, Type5, Type6, Type7, Type8]
    : never;

type InjectTupleArray<T> = T extends [infer Type1, infer Type2]
    ? [Type1[], Type2[]]
    : T extends [infer Type1, infer Type2, infer Type3]
    ? [Type1[], Type2[], Type3[]]
    : T extends [infer Type1, infer Type2, infer Type3, infer Type4]
    ? [Type1[], Type2[], Type3[], Type4[]]
    : T extends [
          infer Type1,
          infer Type2,
          infer Type3,
          infer Type4,
          infer Type5
      ]
    ? [Type1[], Type2[], Type3[], Type4[], Type5[]]
    : T extends [
          infer Type1,
          infer Type2,
          infer Type3,
          infer Type4,
          infer Type5,
          infer Type6
      ]
    ? [Type1[], Type2[], Type3[], Type4[], Type5[], Type6[]]
    : T extends [
          infer Type1,
          infer Type2,
          infer Type3,
          infer Type4,
          infer Type5,
          infer Type6,
          infer Type7
      ]
    ? [Type1[], Type2[], Type3[], Type4[], Type5[], Type6[], Type7[]]
    : T extends [
          infer Type1,
          infer Type2,
          infer Type3,
          infer Type4,
          infer Type5,
          infer Type6,
          infer Type7,
          infer Type8
      ]
    ? [Type1[], Type2[], Type3[], Type4[], Type5[], Type6[], Type7[], Type8[]]
    : never;

type InferTypeTypeNoTuple<T> = ElementType<T> extends never
    ? "primitive"
    : "array";

type ParseObject<Target, T> = T extends "primitive"
    ? PrimitiveParseObject<Target>
    : T extends "array"
    ? ArrayParseObject<ElementType<Target>>
    : T extends "tuple"
    ? TupleParseObject<InferTuple<Target>>
    : never;

export default class EasyBuffer {
    public buffer: Buffer;

    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    public write<ValueType, T extends TypeType>(
        type: Type<ValueType, T>,
        value: ValueType,
        offset: number = 0
    ) {
        type.write(this.buffer, value, offset);
    }

    public read<Target, T extends TypeType>(
        type: Type<Target, T>,
        offset: number = 0
    ): ParseObject<Target, T> {
        if (type.type === "array") {
            const arrayType = type as Type<Target, "array">;
            return new ArrayParseObject(
                arrayType.read(this.buffer, offset) as any,
                this
            ) as ParseObject<Target, T>;
        } else if (type.type === "tuple") {
            const tupleType = type as Type<Target, "tuple">;
            return new TupleParseObject(
                tupleType.read(this.buffer, offset) as any,
                this
            ) as ParseObject<Target, T>;
        } else {
            const primitiveType = type as Type<Target, "primitive">;
            return new PrimitiveParseObject(
                primitiveType.read(this.buffer, offset),
                this
            ) as ParseObject<Target, T>;
        }
    }
}

export class PrimitiveParseObject<Type> {
    protected value: Type;
    protected easyBuffer: EasyBuffer;

    constructor(value: Type, easyBuffer: EasyBuffer) {
        this.value = value;
        this.easyBuffer = easyBuffer;
    }

    public transform<NewType>(
        fn: (value: Type) => NewType
    ): ParseObject<NewType, InferTypeTypeNoTuple<NewType>> {
        const result = fn(this.value);
        if (result instanceof Array) {
            return new ArrayParseObject(result, this.easyBuffer) as any;
        } else {
            return new PrimitiveParseObject(result, this.easyBuffer) as any;
        }
    }

    public transformToTuple<NewType>(
        fn: (value: Type) => NewType
    ): TupleParseObject<InferTuple<NewType>> {
        const result = fn(this.value);
        return new TupleParseObject(result as never, this.easyBuffer) as any;
    }

    public nullIfEquals(
        ...nullables: Type[]
    ): PrimitiveParseObject<Type | null> {
        if (nullables.includes(this.value)) {
            return new PrimitiveParseObject(null, this.easyBuffer);
        } else {
            return this;
        }
    }

    protected clone() {
        return new PrimitiveParseObject<Type>(this.value, this.easyBuffer);
    }

    public end(): Type {
        return this.value;
    }
}

export class TupleParseObject<Type> extends PrimitiveParseObject<
    InferTuple<Type>
> {
    public nullIfTupleItemEquals<T extends InjectTupleArray<Type>>(
        ...nullables: T
    ): TupleParseObject<InjectNullToTuplePartially<Type, T>> {
        const result: (ElementType<Type> | null)[] = [];
        for (let i = 0; i < this.value.length; ++i) {
            result.push(
                (nullables[i] as any).includes(this.value[i])
                    ? null
                    : (this.value[i] as any)
            );
        }
        return new TupleParseObject(result as any, this.easyBuffer);
    }

    public nullIfItemEquals(
        ...nullables: ElementType<Type>[]
    ): TupleParseObject<InjectNullToTuple<Type>> {
        const result: (ElementType<Type> | null)[] = [];
        for (const item of this.value) {
            result.push(nullables.includes(item as any) ? null : (item as any));
        }
        return new TupleParseObject(result as any, this.easyBuffer);
    }

    public transformTupleItem<NewElementType>(
        fn: (val: ElementType<Type>, index: number) => NewElementType
    ): TupleParseObject<ChangeTupleType<Type, NewElementType>> {
        const result: NewElementType[] = [];
        for (let i = 0; i < this.value.length; ++i) {
            result.push(fn(this.value[i] as any, i));
        }
        return new TupleParseObject(result as never, this.easyBuffer);
    }

    protected clone() {
        return new TupleParseObject<Type>(this.value, this.easyBuffer);
    }
}

export class ArrayParseObject<ElementType> extends PrimitiveParseObject<
    ElementType[]
> {
    constructor(value: ElementType[], easyBuffer: EasyBuffer) {
        super(value, easyBuffer);
    }

    public transformItem<NewElementType>(
        fn: (item: ElementType, index: number) => NewElementType
    ): ArrayParseObject<NewElementType> {
        const result: NewElementType[] = [];
        for (let i = 0; i < this.value.length; ++i) {
            result.push(fn(this.value[i], i));
        }
        return new ArrayParseObject(result, this.easyBuffer);
    }

    public nullIfItemEquals(
        ...nullables: ElementType[]
    ): PrimitiveParseObject<(ElementType | null)[]> {
        const result: (ElementType | null)[] = [];
        for (const item of this.value) {
            result.push(nullables.includes(item) ? null : item);
        }
        return new PrimitiveParseObject(result, this.easyBuffer);
    }

    protected clone() {
        return new ArrayParseObject<ElementType>(this.value, this.easyBuffer);
    }
}
