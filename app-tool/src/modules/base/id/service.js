import { uuid } from "../../../utils/id.js";

export function getUUID() {
  let ids = [];
  for (let i = 0; i < 100; i++) {
    ids.push(uuid());
  }
  return ids;
}
