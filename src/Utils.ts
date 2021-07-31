import { Location } from './Location';
import Fire1 from "./img/fire1.jpg";
import Fire2 from "./img/fire2.jpg";

export const EuclideanDistance = (source: Location, target: Location): number => {
  const a = (source.lat - target.lat);

  const b = (source.lng - target.lng);

  const c = Math.sqrt(a * a + b * b);

  return c * 111;
}

export function getFlameSize() {
  return (Math.round(Math.random() * 20) + 40).toString();
}

export function getFlameImage() {
  return Math.random() > 0.5 ? Fire1 : Fire2;
}

export function getFlameLeft(left: string, size: string) {
  return (parseInt(left) - parseInt(size) / 2).toString() + "px"
}