type Obj = Record<string, any>;

export const pluck = <T extends Obj, K extends keyof T>(
  arr: T[],
  key: K
): T[K][] => {
  return arr.map((item) => item[key]);
};

export const pick = <T extends Obj, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keys.includes(key as K))
  ) as Pick<T, K>;
};
