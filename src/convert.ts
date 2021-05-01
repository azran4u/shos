import { DistributionList } from "./model/distribution-list";
import { User } from "./model/user";
import { ReverseGroups } from "./reverse-groups";
import * as _ from "lodash";

export function convert(
  dl: DistributionList[],
  users: User[]
): Map<string, string[]> {
  const upnToGroups = new Map<string, string[]>();
  const usersMap = new Map<string, string>();
  const reverse = new ReverseGroups(dl).getReversedGroups();

  users.map((user) => {
    usersMap.set(user.id, user.upn);
  });

  dl.map((dl) => {
    dl.users.map((user) => {
      const upn = usersMap.get(user);
      const currentGroups = upnToGroups.get(upn);
      upnToGroups.set(upn, _.uniq(_.concat(currentGroups, dl.id)));
    });
  });

  for (let key of upnToGroups.keys()) {
    const groups = upnToGroups.get(key);
    let temp = groups;
    for (let group of groups) {
      temp = _.uniq(_.concat(temp, reverse.get(group)));
    }
    temp = temp.filter((val) => {
      return val !== undefined && val !== null;
    });

    upnToGroups.set(key, temp);
  }

  return upnToGroups;
}
