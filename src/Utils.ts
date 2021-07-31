import { Location } from './Location';

export const EuclideanDistance = (source: Location, target: Location): number => {
  const a = (source.lat - target.lat);

  const b = (source.lng - target.lng);

  const c = Math.sqrt(a * a + b * b);

  return c * 111;
}
