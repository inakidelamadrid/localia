import { useRef } from 'react';
import isEmpty from 'lodash/isEmpty';

export function useLastData<S>(data: S) {
  const ref = useRef(data);
  if (!isEmpty(data)) {
    ref.current = data;
  }
  return ref.current;
}
