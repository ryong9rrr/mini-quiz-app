const START_TIME = "start-time";
const END_TIME = "end-time";

const storage = window.sessionStorage;

function getData<T>(key: string, defaultValue: T): T {
  try {
    const data = storage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

function setData<T>(key: string, value: T) {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw new Error("storage occur error");
  }
}

export default class TimeStorage {
  static getTimeRate(): number {
    const endTime = getData(END_TIME, 0);
    const startTime = getData(START_TIME, 0);
    return Math.floor((endTime - startTime) / 1000);
  }

  static setStartTimeData() {
    setData(START_TIME, Date.now());
  }

  static setEndTimeData() {
    setData(END_TIME, Date.now());
  }
}
