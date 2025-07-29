import { getCurrentTime, convertTime } from "../utils/TimeUtil";

const logMessage = (level: string, variable?: any, otherData?: any) => {
  const hasVar = typeof variable !== 'undefined';
  const hasOther = typeof otherData !== 'undefined';
  const date: string = convertTime(getCurrentTime(), 'DD/MM/YYYY hh:mm:ss');
  let str1 = hasVar ? toStringVariable(variable) : '';
  let str2 = hasOther ? toStringVariable(otherData) : '';
  let logMsg = str1 + str2;
  console.log(`[${date}][ ${level} ]:  ${logMsg}`);
};

const toStringVariable = (variable: any) => {
  let formattedValue;
  if (typeof variable === 'object' && variable !== null) {
    formattedValue = JSON.stringify(variable, null, 2);
  } else {
    formattedValue = variable;
  }
  return formattedValue;
};

const logger = {
  info: (variable?: any, otherData?: any) =>
    logMessage('INFO', variable, otherData),
  warning: (variable?: any, otherData?: any) =>
    logMessage('WARNING', variable, otherData),
  error: (variable?: any, otherData?: any) =>
    logMessage('ERROR', variable, otherData),
  toString: (variable: any) => toStringVariable(variable),
};

export default logger;
