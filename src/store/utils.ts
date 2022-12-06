import { useSelector, shallowEqual } from "react-redux";
import { RootState } from ".";

export function useShallowSelector<T>(fn: (state: RootState) => T): T {
  return useSelector(fn, shallowEqual);
}
