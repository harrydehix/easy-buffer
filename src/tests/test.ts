import parse from "../parse";
import ParsingStructure, { SimpleParseEntry, TransformedParseEntry, DependencyParseEntry } from "../ParsingStructure"
import Type from "../Type";
import { inspect } from "util";
import { ArrayParseEntry, ArrayParseEntryOptions } from "../ArrayParseEntry";
import { Pipeline } from "../Pipeline";




const myBuffer = Buffer.alloc(1000);


let byteIndex = 0;
for(let i = 0; i < 100; ++i){
    myBuffer.write("hallo", byteIndex, "ascii");
    byteIndex += 5;
    myBuffer.writeInt32BE(i, byteIndex);
    byteIndex += 5;
}

type MyType = {
    hums: ({
        label: string,
        value: number,
    })[]
}


const structure : ParsingStructure<MyType> = {
    hums: new ArrayParseEntry({
        label: new SimpleParseEntry({
            $offset: 0,
            $type: Type.STRING(5, "ascii"),
        }),
        value: new SimpleParseEntry({
            $offset: 5,
            $type: Type.INT32_BE,
            $transform: Pipeline((val) => val.toFixed(), (val) => parseInt(val))
        }),
    }, { $size: 100, $itemByteLength: 10, $offset: 0 })
}

const result = parse(structure, myBuffer);

console.log(inspect(result, false, null, true))
