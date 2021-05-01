import { expect } from "chai";
import { convert } from "./convert";
import { DistributionList } from "./model/distribution-list";
import { User } from "./model/user";

describe(`convert`, () => {
  const users: User[] = [
    {
      id: "user-id1",
      upn: "upn1",
    },
    {
      id: "user-id2",
      upn: "upn2",
    },
    {
      id: "user-id3",
      upn: "upn3",
    },
  ];

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
  it("basic conversion", async () => {
    const res = convert(dl, users);
    expect(res.get("upn1")).to.have.same.members(["dl-id1"]);
    expect(res.get("upn2")).to.have.same.members(["dl-id1", "dl-id2"]);
    expect(res.get("upn3")).to.have.same.members([
      "dl-id1",
      "dl-id2",
      "dl-id3",
    ]);
  });
});
