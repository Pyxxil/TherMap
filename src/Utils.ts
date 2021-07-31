import { Location } from './Location';

import Fire1 from "./img/fire1.jpg";
import Fire2 from "./img/fire2.jpg";
import Snowflake1 from "./img/snowflake1.png";
import Snowflake2 from "./img/snowflake2.png";
import Snowflake3 from "./img/snowflake3.png";
import Snowflake4 from "./img/snowflake4.png";

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

export function determineFlameLeft(left: string, size: string) {
  return parseInt(left) - parseInt(size) / 2;
}

export function determineSnowFlakeLeft(left: any, size: string) {
  return parseInt(left) - parseInt(size) / 2;
}

export function determineSnowFlakeBottom(bottom: any, size: string) {
  return parseInt(bottom) - parseInt(size) / 2;
}

export function getSnowflakeX() {
  return Math.floor(Math.random() * 375).toString() + "px";
}

export function getSnowflakeY() {
  return Math.floor(Math.random() * 600).toString() + "px";
}

export function getSnowflakeSize() {
  return (Math.round(Math.random() * 20) + 20).toString() + "px";
}

export function getSnowflakeImage() {
  let randomInt =  Math.floor(Math.random() * 4)
  if (randomInt == 0) return Snowflake1;
  if (randomInt == 1) return Snowflake2;
  if (randomInt == 2) return Snowflake3;
  if (randomInt == 3) return Snowflake4;
}

// export function generateSnowflakes() {
//   var snowflakes = [];
//   for (var i = 0; i < 50; i++) {
//     snowflakes.push([getSnowflakeImage(), getSnowflakeY(), getSnowflakeX(), getSnowflakeSize()]);
//   }
//   return snowflakes;
// }