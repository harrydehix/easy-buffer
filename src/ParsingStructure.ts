import { Type } from "./Type";

export type TransformFunction<Source, Target> = (val: Source) => Target;

export type ArrayTransformFunction<Source, Target> = (val: Source, index: number) => Target;

/** Gets the element type of an array type. */
type GetElementType<T extends any[]> = T extends (infer U)[] ? U : never;
type Infer<T> = T extends (infer U) ? U : never;

export class ParseEntry {};

export class SimpleParseEntry<Context, FinalType extends Context[Property], Property extends keyof Context> extends ParseEntry{
    $type!: Type<FinalType, FinalType extends any[] ? true : false>;
    $offset!: number;
    $nullWith?: null extends FinalType ? keyof Omit<Context, Property> : never;
    $nullables?: null extends FinalType ? FinalType[] : never;
    $entryNullables?: null[] extends FinalType ? (FinalType extends any[] ? (Exclude<GetElementType<FinalType>, null>)[] : never) : never;
    $transform?: TransformFunction<FinalType, FinalType>;
    $transformItem?: FinalType extends any[] ? ArrayTransformFunction<Exclude<GetElementType<FinalType>, null>, GetElementType<FinalType>> : never;
    $gap?: FinalType extends any[] ? number : never;
    $size?: FinalType extends any[] ? number : never;

    constructor(options: SimpleParseEntryOptions<Context, FinalType, Property>){
        super();
        Object.assign(this, options);
    }
};

export type SimpleParseEntryOptions<Context, FinalType extends Context[Property], Property extends keyof Context> = {
    $type: Type<FinalType, FinalType extends any[] ? true : false>;
    $offset: number;
    $nullWith?: null extends FinalType ? keyof Omit<Context, Property> : never;
    $nullables?: null extends FinalType ? FinalType[] : never;
    $entryNullables?: null[] extends FinalType ? (FinalType extends any[] ? (Exclude<GetElementType<FinalType>, null>)[] : never) : never;
    $transform?: TransformFunction<FinalType, FinalType>;
    $transformItem?: FinalType extends any[] ? ArrayTransformFunction<Exclude<GetElementType<FinalType>, null>, GetElementType<FinalType>> : never;
    $gap?: FinalType extends any[] ? number : never;
    $size?: FinalType extends any[] ? number : never;
}

export class TransformedParseEntry<Context, FinalType extends Context[Property], ParserType, Property extends keyof Context> extends ParseEntry{
    $type!: Type<ParserType, ParserType extends any[] ? true : false>;
    $offset!: number;
    $nullWith?: null extends FinalType ? keyof Omit<Context, Property> : never;
    $nullables?: null extends FinalType ? FinalType[] : never;
    $entryNullables?: null[] extends FinalType ? (FinalType extends any[] ? (Exclude<GetElementType<FinalType>, null>)[] : never) : never;
    $transform!: TransformFunction<ParserType, FinalType>;
    $transformItem?: FinalType extends any[] ? ParserType extends any[] ? ArrayTransformFunction<Exclude<GetElementType<ParserType>, null>, GetElementType<FinalType>> : never : never;
    $gap?: FinalType extends any[] ? number : never;
    $size?: FinalType extends any[] ? number : never;

    constructor(options: TransformedParseEntryOptions<Context, FinalType, ParserType, Property>){
        super();
        Object.assign(this, options);
    }
};

export type TransformedParseEntryOptions<Context, FinalType extends Context[Property], ParserType extends any, Property extends keyof Context> = {
    $type: Type<ParserType, ParserType extends any[] ? true : false>;
    $offset: number;
    $nullWith?: null extends FinalType ? keyof Omit<Context, Property> : never;
    $nullables?: null extends FinalType ? FinalType[] : never;
    $entryNullables?: null[] extends FinalType ? (FinalType extends any[] ? (Exclude<GetElementType<FinalType>, null>)[] : never) : never;
    $transform: TransformFunction<ParserType, FinalType>;
    $transformItem?: FinalType extends any[] ? ParserType extends any[] ? ArrayTransformFunction<Exclude<GetElementType<ParserType>, null>, GetElementType<FinalType>> : never : never;
    $gap?: FinalType extends any[] ? number : never;
    $size?: FinalType extends any[] ? number : never;
}


export class DependencyParseEntry<Context, DependencyType extends Context[Dependency], FinalType extends Context[Property], Dependency extends keyof Omit<Context, Property>, Property extends keyof Context> extends ParseEntry{
    $dependsOn!: Dependency;
    $transform!: TransformFunction<Infer<DependencyType>, FinalType>;
    $transformItem?: DependencyType extends any[] ? FinalType extends any[] ? ArrayTransformFunction<Exclude<GetElementType<Infer<DependencyType>>, null>, GetElementType<FinalType>> : never : never;
    $nullWith?: null extends Context[Property] ? keyof Omit<Context, Property> : never;

    constructor(options: DependencyParseEntryOptions<Context, DependencyType, FinalType, Dependency, Property>){
        super();
        Object.assign(this, options);
    }
}

export type DependencyParseEntryOptions<Context, DependencyType extends Context[Dependency], FinalType extends Context[Property], Dependency extends keyof Omit<Context, Property>, Property extends keyof Context> = {
    $dependsOn: Dependency;
    $transform: TransformFunction<Infer<DependencyType>, FinalType>;
    $transformItem?: DependencyType extends any[] ? FinalType extends any[] ? ArrayTransformFunction<Exclude<GetElementType<Infer<DependencyType>>, null>, GetElementType<FinalType>> : never : never;
    $nullWith?: null extends Context[Property] ? keyof Omit<Context, Property> : never;
}



/**
 * Describes how your buffer gets parsed.
 * 
 * **Example**:
 * 
 * ```ts
 * type MyType = {
 *      a: string,
 *      b: {
 *          c: number[],
 *          d: bigint
 *      }
 * }
 * 
 * const parsed = parse(buffer, {
 *      a: new SimpleParseEntry({
 *          $type: Type.STRING(5, "ascii"),
 *          $offset: 0
 *      }),
 *      b: {
 *          c: new SimpleParseEntry({
 *              $type: Type.ARRAY(Type.INT32_LE),
 *              $size: 3,
 *              $offset: 5
 *          }),
 *          d: new TransformedParseEntry({
 *              $type: Type.INT32_LE,
 *              $offset: 17,
 *              $transform: (val) => val*2
 *          }),
 *      }
 * });
 * 
 * ```
 */
export type ParsingStructure<Target> = {
    [Property in keyof Target]: 
        ParsingStructure<Target[Property]> | 
        TransformedParseEntry<Target, Target[Property], any, Property> |
        SimpleParseEntry<Target, Target[Property], Property> |
        DependencyParseEntry<Target, Target[keyof Omit<Target, Property>], Exclude<Target[Property], null>, keyof Omit<Target, Property>, Property> |
        DependencyParseEntry<Target, Target[keyof Omit<Target, Property>], Target[Property], keyof Omit<Target, Property>, Property>
} | SimpleParseEntry<any, Target, any> | TransformedParseEntry<any, Target, any, any>;

export default ParsingStructure;