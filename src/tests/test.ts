import Type from "../Type.js";
import { inspect } from "util";
import EasyBuffer from "../EasyBuffer.js";

const buffer = new EasyBuffer(Buffer.alloc(1000));

buffer
    .at(0)
    .write(
        Type.ARRAY(
            Type.TUPLE_3(Type.INT32_BE, Type.STRING(5), Type.FLOAT_BE),
            3
        ),
        [
            [12, "hello", 23.3],
            [23, "hello", 23.3],
            [111, "hello", 23.3],
        ] as [number, string, number][]
    );
type MyType = {
    hums: [number, string, number][];
};

const result: MyType = {
    hums: buffer
        .read(
            Type.ARRAY(
                Type.TUPLE_3(Type.INT32_BE, Type.STRING(5), Type.FLOAT_BE),
                3
            )
        )
        .end(),
};

console.log(inspect(result, false, null, true));
