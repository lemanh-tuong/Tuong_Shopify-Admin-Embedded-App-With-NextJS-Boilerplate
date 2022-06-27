/* eslint-disable @typescript-eslint/ban-types */
declare type ExtractRouteParams<T extends string> = T extends `${infer _}:${infer Param}/${infer Rest}`
  ? {
      [k in Param | keyof ExtractRouteParams<Rest>]: string;
    }
  : T extends `${infer _}:${infer Param}`
  ? {
      [k in Param]: string;
    }
  : {};

declare type Transform<A> = A extends Promise<infer Inner> ? Inner : never;
declare type GetGeneric<T> = Transform<Promise<T>>;

declare type ArrayToUnion<T> = T extends (infer U)[] ? U : never;

declare type CheckElementExistInArray<T, X> = T extends readonly [X, ...infer _Rest]
  ? true
  : T extends readonly [X]
  ? true
  : T extends readonly [infer _, ...infer Rest]
  ? CheckElementExistInArray<Rest, X>
  : false;

declare type Concat<T1 extends any[], T2 extends any[]> = [...T1, ...T2];

declare type DeepArrayToUnion<T extends any[]> = {
  [K in keyof T]: T[K] extends any[] ? DeepArrayToUnion<T[K]> : T[K];
}[number];

declare type Length<T extends any[]> = T['length'];

declare type Tail<T> = T extends [infer _I, ...infer Rest] ? Rest : never;

declare type Unshift<T extends any[], E> = ((head: E, ...args: T) => any) extends (...args: infer U) => any ? U : T;

declare type DropFromHead<T extends any[], N extends number, I extends any[] = []> = {
  0: DropFromHead<Tail<T>, N, Unshift<I, any>>;
  1: T;
}[Length<I> extends N ? 1 : 0];

declare type Head<T> = T extends [infer I, ...infer _Rest] ? I : never;

declare type Push<T extends any[], E> = ((head: E, ...args: T) => any) extends (head: infer Element, ...args: infer Array) => any
  ? [...Array, Element]
  : T;

declare type DropFromTail<T extends any[], N extends number, I extends any[] = []> = {
  0: DropFromTail<Tail<T>, N, Push<I, Head<T>>>;
  1: I;
}[Length<T> extends N ? 1 : 0];

declare type UniqueArray<T> = T extends readonly [infer X, ...infer Rest]
  ? CheckElementExistInArray<Rest, X> extends true
    ? ['Encountered value with duplicates:', X]
    : readonly [X, ...UniqueArray<Rest>]
  : T;

declare type FlatArray<A extends unknown[]> = ReturnType<
  A extends [infer U, ...infer V] ? (U extends unknown[] ? () => [...U, ...FlatArray<V>] : () => [U, ...FlatArray<V>]) : () => A
>;

declare type HasTail<T extends any[]> = T extends [] | [any] ? false : true;

declare type Last<T extends any[]> = {
  0: Last<Tail<T>>;
  1: Head<T>;
}[HasTail<T> extends true ? 0 : 1];

declare type MutableArray<T> = {
  -readonly [K in keyof T]: T[K];
};

declare type NonEmptyArray<T> = [T, ...T[]];

declare type Position<T extends any[]> = Length<T>;
declare type Next<T extends any[]> = Unshift<T, any>;
declare type Prev<T extends any[]> = Tail<T>;
declare type Iterator<Index extends number = 0, From extends any[] = [], I extends any[] = []> = {
  0: Iterator<Index, Next<From>, Next<I>>;
  1: From;
}[Position<I> extends Index ? 1 : 0];

declare type Reverse<T extends any[], R extends any[] = [], I extends any[] = []> = {
  0: Reverse<T, Unshift<R, T[Position<I>]>, Next<I>>;
  1: R;
}[Position<I> extends Length<T> ? 1 : 0];

declare type AppendArgument<Fn, ArgType> = Fn extends (...args: infer T) => infer R ? (...args: [...T, ArgType]) => R : never;

declare type FunctionDetail<F extends Function> = F extends (...args: infer Params) => infer ReturnType ? [Params, ReturnType] : never;

declare type _Recurse<T> = T extends {
  __rec: never;
}
  ? never
  : T extends {
      __rec: {
        __rec: infer U;
      };
    }
  ? {
      __rec: _Recurse<U>;
    }
  : T extends {
      __rec: infer U;
    }
  ? U
  : T;
declare type Recurse<T> = T extends {
  __rec: unknown;
}
  ? Recurse<_Recurse<T>>
  : T;

declare type IsAny<T> = 0 extends 1 & T ? true : false;

declare type IsAnyRecord<T = any> = Record<any, T>;

/** Essentials */
declare type Primitive = string | number | boolean | bigint | symbol | undefined | null;
declare type IsBuiltIn = Primitive | Function | Date | Error | RegExp;

declare type IsNonUndefinable<T> = T extends undefined ? never : T;

declare type IsRequired<T, K extends keyof T> = Pick<T, K> extends Record<K, T[K]> ? true : false;

declare type IsTuple<T> = T extends any[] ? (any[] extends T ? never : T) : never;

declare type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? true : false;

declare type DeepMutable<T> = {
  -readonly [P in keyof T]: DeepMutable<T[P]>;
};

declare type DeepModify<T> = T extends IsAnyRecord
  ? {
      [K in keyof T]?: undefined extends {
        [K2 in keyof T]: K2;
      }[K]
        ? IsNonUndefinable<T[K]> extends object
          ? true | DeepModify<IsNonUndefinable<T[K]>>
          : true
        : T[K] extends object
        ? true | DeepModify<T[K]>
        : true;
    }
  : never;

/** Like NonNullable but recursive */
declare type DeepNonNullable<T> = T extends IsBuiltIn
  ? NonNullable<T>
  : T extends Map<infer K, infer V>
  ? Map<DeepNonNullable<K>, DeepNonNullable<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepNonNullable<K>, DeepNonNullable<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepNonNullable<K>, DeepNonNullable<V>>
  : T extends Set<infer U>
  ? Set<DeepNonNullable<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepNonNullable<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepNonNullable<U>>
  : T extends Promise<infer U>
  ? Promise<DeepNonNullable<U>>
  : T extends {}
  ? {
      [K in keyof T]: DeepNonNullable<T[K]>;
    }
  : NonNullable<T>;

declare type DeepNullable<T> = T extends IsBuiltIn
  ? T | null
  : T extends Map<infer K, infer V>
  ? Map<DeepNullable<K>, DeepNullable<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepNullable<K>, DeepNullable<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepNullable<K>, DeepNullable<V>>
  : T extends Set<infer U>
  ? Set<DeepNullable<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepNullable<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepNullable<U>>
  : T extends Array<infer U>
  ? T extends IsTuple<T>
    ? {
        [K in keyof T]: DeepNullable<T[K]> | null;
      }
    : Array<DeepNullable<U>>
  : T extends Promise<infer U>
  ? Promise<DeepNullable<U>>
  : T extends {}
  ? {
      [K in keyof T]: DeepNullable<T[K]>;
    }
  : T | null;

declare type DeepOmit<T, Filter extends DeepModify<T>> = T extends IsBuiltIn
  ? T
  : T extends Map<infer KeyType, infer ValueType>
  ? Filter extends Map<KeyType, infer FilterValueType>
    ? FilterValueType extends DeepModify<ValueType>
      ? Map<KeyType, DeepOmit<ValueType, FilterValueType>>
      : T
    : T
  : T extends ReadonlyMap<infer KeyType, infer ValueType>
  ? Filter extends ReadonlyMap<KeyType, infer FilterValueType>
    ? FilterValueType extends DeepModify<ValueType>
      ? ReadonlyMap<KeyType, DeepOmit<ValueType, FilterValueType>>
      : T
    : T
  : T extends WeakMap<infer KeyType, infer ValueType>
  ? Filter extends WeakMap<KeyType, infer FilterValueType>
    ? FilterValueType extends DeepModify<ValueType>
      ? WeakMap<KeyType, DeepOmit<ValueType, FilterValueType>>
      : T
    : T
  : T extends Set<infer ItemType>
  ? Filter extends Set<infer FilterItemType>
    ? FilterItemType extends DeepModify<ItemType>
      ? Set<DeepOmit<ItemType, FilterItemType>>
      : T
    : T
  : T extends ReadonlySet<infer ItemType>
  ? Filter extends ReadonlySet<infer FilterItemType>
    ? FilterItemType extends DeepModify<ItemType>
      ? ReadonlySet<DeepOmit<ItemType, FilterItemType>>
      : T
    : T
  : T extends WeakSet<infer ItemType>
  ? Filter extends WeakSet<infer FilterItemType>
    ? FilterItemType extends DeepModify<ItemType>
      ? WeakSet<DeepOmit<ItemType, FilterItemType>>
      : T
    : T
  : T extends Array<infer ItemType>
  ? Filter extends Array<infer FilterItemType>
    ? FilterItemType extends DeepModify<ItemType>
      ? Array<DeepOmit<ItemType, FilterItemType>>
      : T
    : T
  : T extends Promise<infer ItemType>
  ? Filter extends Promise<infer FilterItemType>
    ? FilterItemType extends DeepModify<ItemType>
      ? Promise<DeepOmit<ItemType, FilterItemType>>
      : T
    : T
  : Filter extends IsAnyRecord
  ? {
      [K in keyof T as K extends keyof Filter ? (Filter[K] extends true ? never : K) : K]: K extends keyof Filter
        ? Filter[K] extends DeepModify<T[K]>
          ? DeepOmit<T[K], Filter[K]>
          : T[K]
        : T[K];
    }
  : never;

declare type DeepPartial<T> = T extends Function
  ? T
  : T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

declare type DeepPick<T, Filter extends DeepModify<T>> = T extends IsBuiltIn
  ? T
  : T extends Map<infer KeyType, infer ValueType>
  ? Filter extends Map<KeyType, infer FilterValueType>
    ? FilterValueType extends DeepModify<ValueType>
      ? Map<KeyType, DeepPick<ValueType, FilterValueType>>
      : T
    : T
  : T extends ReadonlyMap<infer KeyType, infer ValueType>
  ? Filter extends ReadonlyMap<KeyType, infer FilterValueType>
    ? FilterValueType extends DeepModify<ValueType>
      ? ReadonlyMap<KeyType, DeepPick<ValueType, FilterValueType>>
      : T
    : T
  : T extends WeakMap<infer KeyType, infer ValueType>
  ? Filter extends WeakMap<KeyType, infer FilterValueType>
    ? FilterValueType extends DeepModify<ValueType>
      ? WeakMap<KeyType, DeepPick<ValueType, FilterValueType>>
      : T
    : T
  : T extends Set<infer ItemType>
  ? Filter extends Set<infer FilterItemType>
    ? FilterItemType extends DeepModify<ItemType>
      ? Set<DeepPick<ItemType, FilterItemType>>
      : T
    : T
  : T extends ReadonlySet<infer ItemType>
  ? Filter extends ReadonlySet<infer FilterItemType>
    ? FilterItemType extends DeepModify<ItemType>
      ? ReadonlySet<DeepPick<ItemType, FilterItemType>>
      : T
    : T
  : T extends WeakSet<infer ItemType>
  ? Filter extends WeakSet<infer FilterItemType>
    ? FilterItemType extends DeepModify<ItemType>
      ? WeakSet<DeepPick<ItemType, FilterItemType>>
      : T
    : T
  : T extends Array<infer ItemType>
  ? Filter extends Array<infer FilterItemType>
    ? FilterItemType extends DeepModify<ItemType>
      ? Array<DeepPick<ItemType, FilterItemType>>
      : T
    : T
  : T extends Promise<infer ItemType>
  ? Filter extends Promise<infer FilterItemType>
    ? FilterItemType extends DeepModify<ItemType>
      ? Promise<DeepPick<ItemType, FilterItemType>>
      : T
    : T
  : Filter extends IsAnyRecord
  ? {
      [K in keyof T as K extends keyof Filter ? K : never]: Filter[K & keyof Filter] extends true
        ? T[K]
        : K extends keyof Filter
        ? Filter[K] extends DeepModify<T[K]>
          ? DeepPick<T[K], Filter[K]>
          : never
        : never;
    }
  : never;

declare type DeepReadonly<T> = T extends IsBuiltIn
  ? T
  : T extends Map<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends Set<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepReadonly<U>>
  : T extends Promise<infer U>
  ? Promise<DeepReadonly<U>>
  : T extends {}
  ? {
      readonly [K in keyof T]: DeepReadonly<T[K]>;
    }
  : IsUnknown<T> extends true
  ? unknown
  : Readonly<T>;

/** Like Required but recursive */
declare type DeepRequired<T> = T extends IsBuiltIn
  ? NonNullable<T>
  : T extends Map<infer K, infer V>
  ? Map<DeepRequired<K>, DeepRequired<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepRequired<K>, DeepRequired<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepRequired<K>, DeepRequired<V>>
  : T extends Set<infer U>
  ? Set<DeepRequired<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepRequired<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepRequired<U>>
  : T extends Promise<infer U>
  ? Promise<DeepRequired<U>>
  : T extends {}
  ? {
      [K in keyof T]-?: DeepRequired<T[K]>;
    }
  : NonNullable<T>;

declare type DeepUndefinable<T> = T extends IsBuiltIn
  ? T | undefined
  : T extends Map<infer K, infer V>
  ? Map<DeepUndefinable<K>, DeepUndefinable<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepUndefinable<K>, DeepUndefinable<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepUndefinable<K>, DeepUndefinable<V>>
  : T extends Set<infer U>
  ? Set<DeepUndefinable<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepUndefinable<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepUndefinable<U>>
  : T extends Array<infer U>
  ? T extends IsTuple<T>
    ? {
        [K in keyof T]: DeepUndefinable<T[K]> | undefined;
      }
    : Array<DeepUndefinable<U>>
  : T extends Promise<infer U>
  ? Promise<DeepUndefinable<U>>
  : T extends {}
  ? {
      [K in keyof T]: DeepUndefinable<T[K]>;
    }
  : T | undefined;

declare type AppendToObjectWithKeyValue<T, Key extends string, Value> = {
  [key in keyof T | Key]: key extends keyof T ? T[key] : Value;
};

declare type ExclusiveObject<T1, T2 extends T1> = {
  [K in keyof T2]: K extends keyof T1 ? T2[K] : never;
};

declare type FilteredKeysByDataType<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];

declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

declare type LastOfUnion<T> = UnionToIntersection<T extends any ? () => T : never> extends () => infer R ? R : never;

declare type UnionToTuple<T> = UnionToIntersection<T extends any ? (t: T) => T : never> extends (_: any) => infer W
  ? [...UnionToTuple<Exclude<T, W>>, W]
  : [];

declare type NonObjectKeysOf<T> = {
  [K in keyof T]: T[K] extends Array<any> ? K : T[K] extends object ? never : K;
}[keyof T];
declare type ValuesOf<T> = T[keyof T];
declare type ObjectValuesOf<T extends Object> = Exclude<Exclude<Extract<ValuesOf<T>, object>, never>, Array<any>>;
declare type DeepFlatten<T> = T extends any ? Pick<T, NonObjectKeysOf<T>> & UnionToIntersection<DeepFlatten8<ObjectValuesOf<T>>> : never;
declare type DeepFlatten8<T> = T extends any ? Pick<T, NonObjectKeysOf<T>> & UnionToIntersection<DeepFlatten7<ObjectValuesOf<T>>> : never;
declare type DeepFlatten7<T> = T extends any ? Pick<T, NonObjectKeysOf<T>> & UnionToIntersection<DeepFlatten6<ObjectValuesOf<T>>> : never;
declare type DeepFlatten6<T> = T extends any ? Pick<T, NonObjectKeysOf<T>> & UnionToIntersection<DeepFlatten5<ObjectValuesOf<T>>> : never;
declare type DeepFlatten5<T> = T extends any ? Pick<T, NonObjectKeysOf<T>> & UnionToIntersection<DeepFlatten4<ObjectValuesOf<T>>> : never;
declare type DeepFlatten4<T> = T extends any ? Pick<T, NonObjectKeysOf<T>> & UnionToIntersection<DeepFlatten3<ObjectValuesOf<T>>> : never;
declare type DeepFlatten3<T> = T extends any ? Pick<T, NonObjectKeysOf<T>> & UnionToIntersection<DeepFlatten2<ObjectValuesOf<T>>> : never;
declare type DeepFlatten2<T> = T extends any ? Pick<T, NonObjectKeysOf<T>> & UnionToIntersection<DeepFlatten1<ObjectValuesOf<T>>> : never;
declare type DeepFlatten1<T> = T extends any ? Pick<T, NonObjectKeysOf<T>> : UnionToIntersection<ObjectValuesOf<T>>;

declare type GetRequired<T> = {
  [K in keyof T as IsRequired<T, K> extends true ? K : never]: T[K];
};

declare type GetOptional<T> = Omit<T, keyof GetRequired<T>>;

declare type IntersectValueOf<T> = {
  [K in keyof T]: (x: T[K]) => void;
} extends Record<keyof T, (x: infer V) => void>
  ? V
  : never;

declare type KeyOf<T extends object> = keyof T;

declare type Zip_DeepMergeTwoTypes<T, U> = T extends []
  ? U
  : U extends []
  ? T
  : [DeepMergeTwoTypes<Head<T>, Head<U>>, ...Zip_DeepMergeTwoTypes<Tail<T>, Tail<U>>];
/**
 * Take two objects T and U and create the new one with uniq keys for T a U objectI
 * helper generic for `DeepMergeTwoTypes`
 */
declare type GetObjDifferentKeys<
  T,
  U,
  T0 = Omit<T, keyof U> & Omit<U, keyof T>,
  T1 = {
    [K in keyof T0]: T0[K];
  }
> = T1;
/**
 * Take two objects T and U and create the new one with the same objects keys
 * helper generic for `DeepMergeTwoTypes`
 */
declare type GetObjSameKeys<T, U> = Omit<T | U, keyof GetObjDifferentKeys<T, U>>;
declare type MergeTwoObjects<
  T,
  U,
  T0 = Partial<GetObjDifferentKeys<T, U>> &
    {
      [K in keyof GetObjSameKeys<T, U>]: DeepMergeTwoTypes<T[K], U[K]>;
    },
  T1 = {
    [K in keyof T0]: T0[K];
  }
> = T1;
declare type DeepMergeTwoTypes<T, U> = [T, U] extends [any[], any[]]
  ? Zip_DeepMergeTwoTypes<T, U>
  : [T, U] extends [
      {
        [key: string]: unknown;
      },
      {
        [key: string]: unknown;
      },
    ]
  ? MergeTwoObjects<T, U>
  : T | U;

declare type MergeObject2<A extends object, B extends object> = Omit<A, keyof B> & B;

declare type MutableObject<T> = {
  -readonly [K in keyof T]: T[K];
};

declare type Overwrite<T1, T2> = {
  [P in Exclude<keyof T1, keyof T2>]: T1[P];
} &
  T2;

declare type SubKeys<T, K extends string> = K extends keyof T ? `${K}.${PathKeys<T[K]>}` : never;
declare type PathKeys<T> = object extends T
  ? string
  : T extends readonly any[]
  ? Extract<keyof T, `${number}`> | SubKeys<T, Extract<keyof T, `${number}`>>
  : T extends object
  ? Extract<keyof T, string> | SubKeys<T, Extract<keyof T, string>>
  : never;
declare type PathKeyOfObject<T, Key extends keyof T = keyof T> = Key extends string
  ? T[Key] extends Record<string, any>
    ?
        | `${Key}.${PathKeyOfObject<T[Key], Exclude<keyof T[Key], keyof Array<any>>> & string}`
        | `${Key}.${Exclude<keyof T[Key], keyof Array<any>> & string}`
        | Key
    : Key
  : never;

declare type PathValue<T, P extends PathKeyOfObject<T>> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends PathKeyOfObject<T[Key]>
      ? PathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;

declare type PropType<T, Path extends string> = string extends Path
  ? unknown
  : Path extends keyof T
  ? T[Path]
  : Path extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? PropType<T[K], R>
    : unknown
  : unknown;

declare type Join<T extends unknown[], D extends string> = T extends []
  ? ''
  : T extends [string | number | boolean | bigint]
  ? `${T[0]}`
  : T extends [string | number | boolean | bigint, ...infer U]
  ? `${T[0]}${D}${Join<U, D>}`
  : string;

declare type Replace<Source extends string, SearchValue extends string, NewValue extends string> = SearchValue extends ''
  ? Source
  : Source extends `${infer Head}${SearchValue}${infer Tail}`
  ? `${Head}${NewValue}${Tail}`
  : Source;

declare type _Split<S extends string, D extends string, A extends any[] = []> = S extends `${infer T}${D}${infer U}`
  ? {
      __rec: _Split<U, D, Push<A, T>>;
    }
  : A;
declare type Split<S extends string, D extends string> = Recurse<_Split<S, D>>;

declare type StringIncludes<T extends string, U extends string> = T extends `${any}${U}${any}` ? true : false;

declare type StringToUnion<T extends string> = T extends `${infer Character}${infer Rest}` ? Character | StringToUnion<Rest> : never;

declare type TrimLeft<V extends string> = V extends ` ${infer R}` ? TrimLeft<R> : V;

declare type TrimRight<V extends string> = V extends `${infer R} ` ? TrimRight<R> : V;

declare type Trim<V extends string> = TrimLeft<TrimRight<V>>;

declare type KebabCase<T> = T extends `${infer Character}${infer Rest}`
  ? Rest extends Uncapitalize<Rest>
    ? `${Uncapitalize<Character>}${KebabCase<Rest>}`
    : `${Uncapitalize<Character>}-${KebabCase<Rest>}`
  : T;

export {
  AppendArgument,
  AppendToObjectWithKeyValue,
  ArrayToUnion,
  CheckElementExistInArray,
  Concat,
  DeepArrayToUnion,
  DeepFlatten,
  DeepMergeTwoTypes,
  DeepModify,
  DeepMutable,
  DeepNonNullable,
  DeepNullable,
  DeepOmit,
  DeepPartial,
  DeepPick,
  DeepReadonly,
  DeepRequired,
  DeepUndefinable,
  DropFromHead,
  DropFromTail,
  ExclusiveObject,
  ExtractRouteParams,
  FilteredKeysByDataType,
  FlatArray,
  FunctionDetail,
  GetGeneric,
  GetOptional,
  GetRequired,
  HasTail,
  Head,
  IntersectValueOf,
  IsAny,
  IsAnyRecord,
  IsBuiltIn,
  IsNonUndefinable,
  IsRequired,
  IsTuple,
  IsUnknown,
  Iterator,
  Join,
  KebabCase,
  KeyOf,
  Last,
  LastOfUnion,
  Length,
  MergeObject2,
  MutableArray,
  MutableObject,
  Next,
  NonEmptyArray,
  Overwrite,
  PathKeyOfObject,
  PathKeys,
  PathValue,
  Position,
  Prev,
  Primitive,
  PropType,
  Push,
  Recurse,
  Replace,
  Reverse,
  Split,
  StringIncludes,
  StringToUnion,
  Tail,
  Trim,
  TrimLeft,
  TrimRight,
  UnionToIntersection,
  UnionToTuple,
  UniqueArray,
  Unshift,
};
