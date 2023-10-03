import Type from "../Type";
import { inspect } from "util";
import EasyBuffer from "../EasyBuffer";

const myBuffer = Buffer.alloc(1000);

let byteIndex = 0;
for (let i = 0; i < 3; ++i) {
    myBuffer.writeInt32BE(i, byteIndex);
    byteIndex += 4;
    myBuffer.write("hell" + i, byteIndex, "ascii");
    byteIndex += 6;
}

const buffer = new EasyBuffer(myBuffer);

type MyType = {
    hums: [number, number, number];
};

const result: MyType = {
    hums: buffer
        .read({
            type: Type.TUPLE_3(Type.INT32_BE, Type.STRING(5), Type.STRING(5)),
            offset: 0,
        })
        .transformTupleItem((item, index) => 3)
        .end(),
};

console.log(inspect(result, false, null, true));
