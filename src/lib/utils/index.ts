export const getElapsedTime = (startTime: number) => {
  const currentTime = Date.now();
  const diff = currentTime - startTime;
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  return { hour, min, sec };
};
