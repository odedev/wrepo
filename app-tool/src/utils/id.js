
import { v4 as uuidv4 } from 'uuid';
export function uuid() {
  let id = uuidv4();
  return id.replaceAll('-', '');
}
