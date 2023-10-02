import { ArrayParseEntry } from "./ArrayParseEntry";
import ParsingStructure, { DependencyParseEntry, SimpleParseEntry, TransformedParseEntry, ParseEntry } from "./ParsingStructure";
import { Type } from "./Type";


/**
 * Converts the buffer to your desired target type using a parsing structure.
 */
export default function parse<Target>(parsingStructure: ParsingStructure<Target>, buffer: Buffer, offset=0): Target{
    return parseRecursivelly(undefined, parsingStructure, buffer, offset);
}


function parseRecursivelly(context: any, parsingStructure: any, buffer: Buffer, offset: number): any{
    let result;
    
    if(parsingStructure instanceof ParseEntry){
        const entry = parsingStructure;
        result = parseEntry(buffer, context, entry as any, offset);
    
    }else if(parsingStructure instanceof ArrayParseEntry){
        result = [];
        for(let i = 0; i < parsingStructure.$size; ++i){
            result.push(parseRecursivelly(undefined, parsingStructure[0], buffer, parsingStructure.$offset + offset + i*parsingStructure.$itemByteLength));
        }
    }else if(parsingStructure instanceof Array){
        result = [];
        for(const item of parsingStructure){
            result.push(parseRecursivelly(undefined, item, buffer, offset));
        }
    }else if(typeof parsingStructure === "object"){
        result = {} as any;
        const keys = Object.keys(parsingStructure);
        for(const key of keys){
            const keyResult = parseRecursivelly(result, parsingStructure[key] as any, buffer, offset);
            if(keyResult === Signals.DEPENDENCY_MISSING){
                keys.push(key);
            }else{
                 result[key] = keyResult;
            }
        }
    }else{
        result = parsingStructure;
    }

    return result;
}

const Signals = {
    DEPENDENCY_MISSING: Symbol(),
}

type Signal = typeof Signals[keyof typeof Signals];

function parseEntry(buffer: Buffer, context: any, entry: SimpleParseEntry<any, any, any> | TransformedParseEntry<any, any, any, any> | DependencyParseEntry<any, any, any, never, any>, offset: number): any{
    if(entry instanceof DependencyParseEntry && context[entry.$dependsOn] === undefined){
        return Signals.DEPENDENCY_MISSING;
    }

    if(entry.$nullWith){
        switch(context[entry.$nullWith]){
            case undefined:
                return Signals.DEPENDENCY_MISSING;
            case null:
                return null as any;
        }
    }

    let result;
    if(entry instanceof SimpleParseEntry || entry instanceof TransformedParseEntry){
        if(entry.$type.isArray){
            result = entry.$type.parse(buffer, entry.$offset + offset, entry.$gap || 0, entry.$size || 1);

            if(entry.$entryNullables){
                for(let i = 0; i < result.length; ++i){
                    if(entry.$entryNullables.includes(result[i])){
                        result[i] = null;
                    }
                }
            }
        }else{
            result = (entry.$type as Type<any, false>).parse(buffer, entry.$offset + offset);
        }

        if(entry.$nullables && entry.$nullables.includes(result)){
            result = null;
        }

        if(entry.$type.isArray && entry.$transformItem){
            for(let i = 0; i < result.length; ++i){
                if(result[i] !== null) result[i] = entry.$transformItem(result[i], i);
            }
        }

        if(result !== null && entry.$transform){
            result = entry.$transform(result);
        }
    }else{
        result = context[entry.$dependsOn];
        result = entry.$transform(result);
    }

    return result;
}