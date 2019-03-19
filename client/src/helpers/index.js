import titleize from "titleize";

export const rentalType = isShared => {
  // if (isShared) {
  //   return 'shared';
  // } else {
  //   return 'entire';
  // }

  return isShared ? "shared" : "entire";
};

export const toUpperCase = value => (value ? titleize(value) : "");
