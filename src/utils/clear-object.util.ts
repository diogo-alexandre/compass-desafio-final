// eslint-disable-next-line import/no-unresolved
import { isRegExp } from 'util/types';

function clearObject <T>(obj: any): T {
  const result: any = {};

  Object.keys(obj).forEach((key) => {
    if (!(Number.isNaN(obj[key]) && typeof obj[key] === 'number')) {
      if (obj[key] !== undefined && obj[key] !== '') {
        if (isRegExp(obj[key])) {
          if (String(obj[key]) !== String(/(?:)/i)) {
            result[key] = obj[key];
          }
        } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && !(obj[key] instanceof Date)) {
          const r = clearObject<any>(obj[key]);

          if (Object.keys(r).length > 0) {
            result[key] = r;
          }
        } else if (Array.isArray(obj[key])) {
          obj[key] = obj[key].map((v: any) => clearObject(v)).filter((v: any) => (typeof v === 'object' && Object.keys(v).length > 0));

          if (obj[key].length > 0) {
            result[key] = obj[key];
          }
        } else {
          result[key] = obj[key];
        }
      }
    }
  });

  return result;
}

export default clearObject;
