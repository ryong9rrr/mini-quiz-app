export const convertTime = (totalSec: number | null) => {
  if (!totalSec) {
    return [0, 0, 0];
  }
  const hour = Math.floor(totalSec / 3600);
  totalSec %= 3600;
  const min = Math.floor(totalSec / 60);
  totalSec %= 60;
  const sec = Math.floor(totalSec);
  return [hour, min, sec];
};
