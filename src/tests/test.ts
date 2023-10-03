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
    hums: {
        value: number | null;
        label: string | null;
    };
};

const result: MyType = {
    hums: buffer
        .read({
            type: Type.TUPLE_7(
                Type.INT32_BE,
                Type.STRING(5),
                Type.STRING(5),
                Type.STRING(5),
                Type.STRING(5),
                Type.STRING(5),
                Type.STRING(5)
            ),
            offset: 0,
        })
        .transform((item) => ({
            value: item[0] === 2 ? null : item[0],
            label: item[0] === 2 ? null : item[1],
        }))
        .end(),
};

console.log(inspect(result, false, null, true));
