# easy-buffer

Provides a powerful interface to read primitives, arrays and tuples from a buffer and transform them after that.

# Examples

Let's get started quickly and learn from simple examples!

Every example expects an easy buffer instance. You can create one like this:

```ts
import { EasyBuffer, Type } from "easy-buffer";

// the nodejs buffer you want to read from
const buffer: Buffer = ...;

// just pass the nodejs buffer to the easy buffer constructor
const easy = new Easybuffer(buffer);
```

### Example 1: Primitives

To read a primitive `INT32_BE` which is located at byte `16` write:

```ts
const number = easy.read({ type: Type.INT32_BE, offset: 16 }).end();
```

To read a `ascii` string which is located at byte `20` and is `15` bytes long write:

```ts
const primitive = easy
    .read({ type: Type.STRING(15, "ascii"), offset: 20 })
    .end();
```

### Example 2: Arrays

Imagine your buffer is structured like this:

![](./screenshots/2.jpg)

Assume you want to convert this buffer into a simple `number[]`:

```ts
const array = easy.read({ type: Type.ARRAY(Type.INT32_LE, 4) }).end();
```

To parse an array we simply utilized the `Type.ARRAY(...)` method and passed our item's type.

### Example 3: Arrays with gaps

Imagine your buffer is structured like this:

![](./screenshots/3.jpg)

Again your buffer has an arrayish structure but there are some nasty gaps in there.

I don't see any problem, just specify the gap's size in bytes🙃.

```ts
const array = easy
    .read({ type: Type.ARRAY(Type.INT32_LE, 4, 4), offset: 0 })
    .end();
```

_Tip: It is possible to nest multiple Type.ARRAY(type, size, gap) calls to read arrays of higher dimensions!_

### Example 4: Tuples

It is also possible to read tuples.

```ts
const tuple = easy
    .read({
        type: Type.TUPLE_3(
            Type.INT32_LE,
            Type.STRING(3, "ascii"),
            Type.FLOAT_LE
        ),
        offset: 5,
    })
    .end(); // this returns a tuple of type [number, string, number]
```

### Example 5: Transforming your data after it got parsed

It is also possible to transform your data after it got parsed to the specified `type`.

To do so call `.transform(val => ...)` before calling `.end()`. You can chain multiple transform calls.

```ts
const primitive = easy
    .read({ type: Type.STRING(15, "ascii"), offset: 20 })
    .transform((str) => str.toUpperCase()) // this makes the string uppercase
    .end();
```

If you want to transform each item of an array individually you can call `.transformItem((val, index) => ...)`.

```ts
const array = easy
    .read({ type: Type.ARRAY(Type.INT32_LE), size: 4, gap: 4, offset: 0 })
    .transformItem((val, index) => val.toFixed(2)) // converts each number to string
    .end();
```

If you want to transform your tuple (but still want it to be a tuple) call `.transformTuple(tuple => ...)`.

```ts
const tuple = easy
    .read({
        type: Type.TUPLE_3(
            Type.INT32_LE,
            Type.STRING(3, "ascii"),
            Type.FLOAT_LE
        ),
        offset: 5,
    })
    .transformTuple((tuple) => [
        tuple[0] * 2,
        tuple[1].toUpperCase(),
        tuple[2].toFixed(2),
    ])
    .end(); // this returns a tuple of type [number, string, string]
```

### Example 6: Nulling values

In some of my projects specific values of an integer have a special meaning, e.g. `0x12A3` or `0x32A4` meant `'no signal'`. In these cases I wanted to return `null` instead. That's why this library offers multiple functions to automatically null the parsed result if certain conditions are met.

`.nullIfEquals(...nullables)` nulls result if it matches one of the passed nullable.
`.nullIfItemEquals(...nullables)` does the same but for arrays.
`.nullIfTupleItemEquals([...nullables, ...nullables, ...])` does the same but for tuples.
