export const json2Formdata = (json: any): FormData => {
  const formData = new FormData();
  json2FormdataTrans(json, formData);
  return formData;
};

const array2Obj = (arr: any) =>
  arr.reduce((acc: any, el: any, index: number) => ({ ...acc, [index]: el }), {});

const json2FormdataTrans = (
  json: any,
  formData: any,
  esp: String = 'file',
  path: any[] = [],
) => {
  Object.entries(json).map(([k, v]) => {
    const nPath = [...path, path?.length ? `[${k}]` : k];
    if (typeof v === 'object' && v != null) {
      if (Array.isArray(v) && v?.length > 0) {
        json2FormdataTrans(array2Obj(v), formData, esp, nPath);
      } else {
        if (k == 'file' || !v) {
          formData.append(nPath.join(''), v);
        } else {
          json2FormdataTrans(v, formData, esp, nPath);
        }
      }
    } else {
      formData.append(nPath.join(''), v);
    }
  });
};

export const parseJsonObject = (object: string): any | null => {
  try {
    if (typeof object === 'string') {
      return JSON.parse(object);
    }
  } catch (err) {

  }
  return null;
};