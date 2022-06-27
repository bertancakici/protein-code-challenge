import operationsModule from "../../src/store/modules/operationsModule"

const tempData = [
  {
    finishedAt: "Mon Jun 27 2022 23:10:24 GMT+0300 (GMT+03:00)",
    id: 11,
    inProgress: false,
    startedAt: "Mon Jun 27 2022 23:10:23 GMT+0300 (GMT+03:00)",
    uid: 1656360623846,
  },
  {
    finishedAt: "Mon Jun 27 2022 23:10:23 GMT+0300 (GMT+03:00)",
    id: 10,
    inProgress: false,
    startedAt: "Mon Jun 27 2022 23:10:23 GMT+0300 (GMT+03:00)",
    uid: 1656360623695,
  },
  {
    finishedAt: "Mon Jun 27 2022 23:10:23 GMT+0300 (GMT+03:00)",
    id: 9,
    inProgress: false,
    startedAt: "Mon Jun 27 2022 23:10:23 GMT+0300 (GMT+03:00)",
    uid: 1656360623532,
  }
]

operationsModule.state.operations = tempData;

describe("operations", () => {
  it("list from getAll method", () => {

    const actual = operationsModule.getters.getAll(operationsModule.state.operations);
    expect(actual).toEqual([tempData[0], tempData[1], tempData[2]])
  });


  it("getting total test :", () => {
    const actual = operationsModule.getters.getTotal();
    expect(actual).toEqual(tempData.length);
  });
});