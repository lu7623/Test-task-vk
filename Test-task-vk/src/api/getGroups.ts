import groups from "./groups.json" assert { type: "json" };
import { GetGroupsResponse } from "./types";

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getGroups() {
  const res: GetGroupsResponse = {
    result: 1,
    data: groups,
  };

  return res;
}

export async function getGroupsWithDelay(): Promise<GetGroupsResponse> {
  await timeout(1000);
  return getGroups();
}
