import {
  getFlameImage,
  getFlameSize,
  getSnowflakeImage,
  getSnowflakeSize,
  getSnowflakeX,
  getSnowflakeY,
} from "./Utils";

import Snow3 from "./img/snow03.png";
import Snow5 from "./img/snow05.png";
import Snow7 from "./img/snow07.png";
import Snow9 from "./img/snow09.png";
import Snow10 from "./img/snow10.png";
import Snow16 from "./img/snow16.png";
import Snow17 from "./img/snow17.png";
import Snow18 from "./img/snow18.png";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY?.toString() ?? "";

export const fireLocations = [
  // image, bottom, left, size
  [getFlameImage(), "400px", "140", getFlameSize()],
  [getFlameImage(), "380px", "220", getFlameSize()],
  [getFlameImage(), "320px", "80", getFlameSize()],
  [getFlameImage(), "305px", "20", getFlameSize()],
  [getFlameImage(), "300px", "220", getFlameSize()],
  [getFlameImage(), "290px", "320", getFlameSize()],
  [getFlameImage(), "250px", "40", getFlameSize()],
  [getFlameImage(), "230px", "130", getFlameSize()],
  [getFlameImage(), "205px", "350", getFlameSize()],
  [getFlameImage(), "174px", "235", getFlameSize()],
  [getFlameImage(), "160px", "30", getFlameSize()],
  [getFlameImage(), "140px", "310", getFlameSize()],
  [getFlameImage(), "140px", "90", getFlameSize()],
  [getFlameImage(), "60px", "70", getFlameSize()],
  [getFlameImage(), "40px", "140", getFlameSize()],
  [getFlameImage(), "40px", "270", getFlameSize()],
  [getFlameImage(), "30px", "20", getFlameSize()],
  [getFlameImage(), "10px", "210", getFlameSize()],
  [getFlameImage(), "5px", "330", getFlameSize()],
  [getFlameImage(), "-10px", "100", getFlameSize()],
];

// image, bottom, left, width, height, angle, flip
export const snowLocations = [
  [Snow3, "280px", "-10px", "80px", "auto", "0deg", "1"],
  [Snow16, "370px", "90px", "130px", "70px", "0deg", "1"],
  [Snow17, "250px", "300px", "80px", "100px", "0deg", "1"],
  [Snow7, "270px", "140px", "150px", "70px", "0deg", "1"],
  [Snow5, "200px", "-5px", "150px", "80px", "0deg", "1"],
  [Snow9, "140px", "10px", "50px", "auto", "0deg", "-1"],
  [Snow10, "130px", "80px", "60px", "40px", "0deg", "1"],
  [Snow10, "125px", "180px", "60px", "40px", "-35deg", "-1"],
  [Snow9, "170px", "260px", "50px", "auto", "-30deg", "1"],
];

// image, bottom, left, width, flip
export const groundSnowLocations = [
  [Snow18, "45px", "-6px", "160px", "-1"],
  [Snow18, "35px", "205px", "150px", "-1"],
  [Snow18, "40px", "270px", "140px", "1"],
  [Snow18, "20px", "280px", "120px", "1"],
  [Snow18, "10px", "230px", "120px", "1"],
  [Snow18, "10px", "190px", "130px", "-1"],
  [Snow18, "15px", "135px", "120px", "-1"],
  [Snow18, "10px", "110px", "120px", "-1"],
  [Snow18, "20px", "90px", "150px", "1"],
  [Snow18, "20px", "40px", "150px", "1"],
  [Snow18, "23px", "-30px", "160px", "-1"],
  [Snow18, "-5px", "-30px", "160px", "1"],
  [Snow18, "-4px", "20px", "160px", "-1"],
  [Snow18, "-10px", "80px", "160px", "1"],
  [Snow18, "10px", "150px", "200px", "1"],
  [Snow18, "-8px", "200px", "220px", "1"],
];

export const generateSnowflakes = new Array(50).fill([]).map((arr) => {
  return [
    getSnowflakeImage(),
    getSnowflakeY(),
    getSnowflakeX(),
    getSnowflakeSize(),
  ];
});
