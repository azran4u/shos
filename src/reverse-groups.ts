import { DistributionList } from "./model/distribution-list";
import * as _ from "lodash";

export class ReverseGroups {
  private reversedGroups: Map<string, string[]>; // map groupId to fathers group's ids

  constructor(private dl: DistributionList[]) {
    this.reversedGroups = new Map<string, string[]>();
    this.all();
  }

  getReversedGroups() {
    return this.reversedGroups;
  }

  private reverse() {
    this.dl.map((dl) => {
      this.reversedGroups.set(dl.id, []);
    });

    this.dl.map((dl) => {
      dl.childs.map((child) => {
        const currentFathers = this.reversedGroups.get(child);
        this.reversedGroups.set(child, _.uniq(_.concat(currentFathers, dl.id)));
      });
    });
  }

  private recursive(id: string): string[] {
    const currentFathers = this.reversedGroups.get(id);
    if (_.isEmpty(currentFathers)) {
      return [];
    }
    let temp = [];
    for (let id of currentFathers) {
      temp = _.uniq(_.concat(temp, id, this.recursive(id)));
    }
    return temp;
  }

  private all() {
    this.reverse();
    for (let key of this.reversedGroups.keys()) {
      const currentFathers = this.reversedGroups.get(key);
      this.reversedGroups.set(
        key,
        _.uniq(_.concat(currentFathers, this.recursive(key)))
      );
    }
  }
}
