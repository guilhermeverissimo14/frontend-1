import { HttpParams } from '@angular/common/http';

export function createHttpParams(params: any): HttpParams {
  return Object.keys(params).reduce((httpParams, key) => {
    const value = params[key];

    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          httpParams = httpParams.append(key, item);
        });
      } else {
        httpParams = httpParams.set(key, value);
      }
    }

    return httpParams;
  }, new HttpParams());
}
