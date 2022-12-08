import { WebStorage } from "~/lib/core";

const START_TIME = "start-time";
const END_TIME = "end-time";

class TimeStorage extends WebStorage {
  constructor() {
    super("session");
  }

  getTimeRate(): number {
    const endTime = this.getData(END_TIME, 0);
    const startTime = this.getData(START_TIME, 0);
    return Math.floor((endTime - startTime) / 1000);
  }

  setStartTimeData() {
    this.setData(START_TIME, Date.now());
  }

  setEndTimeData() {
    this.setData(END_TIME, Date.now());
  }
}

const timeStorage = new TimeStorage();

export default timeStorage;
