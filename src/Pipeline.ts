import flow from "lodash.flow";

export function Pipeline<S, R1, R2, R3, R4, R5, R6, E>(
    f1: (val: S) => R1,
    f2: (val: R1) => R2,
    f3: (val: R2) => R3,
    f4: (val: R3) => R4,
    f5: (val: R4) => R5,
    f6: (val: R5) => R6,
    f7: (val: R6) => E
): (val: S) => E;

export function Pipeline<S, R1, R2, R3, R4, R5, E>(
    f1: (val: S) => R1,
    f2: (val: R1) => R2,
    f3: (val: R2) => R3,
    f4: (val: R3) => R4,
    f5: (val: R4) => R5,
    f6: (val: R5) => E
): (val: S) => E;

export function Pipeline<S, R1, R2, R3, R4, E>(
    f1: (val: S) => R1,
    f2: (val: R1) => R2,
    f3: (val: R2) => R3,
    f4: (val: R3) => R4,
    f5: (val: R4) => E
): (val: S) => E;

export function Pipeline<S, R1, R2, R3, E>(
    f1: (val: S) => R1,
    f2: (val: R1) => R2,
    f3: (val: R2) => R3,
    f4: (val: R3) => E
): (val: S) => E;

export function Pipeline<S, R1, R2, E>(
    f1: (val: S) => R1,
    f2: (val: R1) => R2,
    f3: (val: R2) => E
): (val: S) => E;

export function Pipeline<S, R1, E>(
    f1: (val: S) => R1,
    f2: (val: R1) => E
): (val: S) => E;

export function Pipeline<S, E>(f1: (val: S) => E): (val: S) => E;

export function Pipeline(...func: Array<(val: any) => any>): (val: any) => any {
    return flow(func);
}
