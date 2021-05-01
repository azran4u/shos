import { expect } from "chai";
import { DistributionList } from "./model/distribution-list";
import { ReverseGroups } from "./reverse-groups";

describe(`reverse`, () => {
  const dl: DistributionList[] = [
    {
      id: "dl-id1",
      users: ["user-id1"],
      childs: ["dl-id2"],
    },
    {
      id: "dl-id2",
      users: ["user-id2"],
      childs: ["dl-id3"],
    },
    {
      id: "dl-id3",
      users: ["user-id3"],
      childs: [],
    },
  ];
  beforeEach(function () {});
  afterEach(function () {});
  it("basic reverse", async () => {
    const reverse = new ReverseGroups(dl).getReversedGroups();
    expect(reverse.get("dl-id1")).to.have.same.members([]);
    expect(reverse.get("dl-id2")).to.have.same.members(["dl-id1"]);
    expect(reverse.get("dl-id3")).to.have.same.members(["dl-id1", "dl-id2"]);
  });
});
