import "@testing-library/jest-dom";
import { getTime } from "~/lib/utils";

test("시간 변환 함수 테스트", () => {
  const TEST_CASE = [
    {
      totalSec: 153,
      result: [0, 2, 33],
    },
    {
      totalSec: 1234,
      result: [0, 20, 34],
    },
  ];

  TEST_CASE.forEach(({ totalSec, result }) => {
    expect(getTime(totalSec)).toEqual(result);
  });
});
