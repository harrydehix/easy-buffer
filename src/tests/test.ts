import parse from "../parse";
import ParsingStructure, { SimpleParseEntry, TransformedParseEntry, DependencyParseEntry } from "../ParsingStructure"
import Type from "../Type";
import { inspect } from "util";
import { ArrayParseEntry, ArrayParseEntryOptions } from "../ArrayParseEntry";
import { Pipeline } from "../Pipeline";




const myBuffer = Buffer.alloc(1000);


let byteIndex = 0;
myBuffer.writeUint8(64, 0);
byteIndex += 1;
for(let i = 0; i < 3; ++i){
    myBuffer.write("hallo", byteIndex, "ascii");
    byteIndex += 5;
    myBuffer.writeInt32BE(i, byteIndex);
    byteIndex += 5;
}

type MyType = {
    test: boolean,
    hums: ({
        label: string,
        value: number,
    })[]
}


const structure : ParsingStructure<MyType> = {
    test: new SimpleParseEntry({
        $type: Type.BIT(1),
        $offset: 0,
    }),
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
    }, { $size: 3, $itemByteLength: 10, $offset: 1 })
}

const result = parse(structure, myBuffer);

console.log(inspect(result, false, null, true))
