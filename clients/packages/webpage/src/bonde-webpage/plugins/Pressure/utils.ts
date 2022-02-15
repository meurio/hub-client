// # arrayUtils

const distinct = (value: any, index: any, self: any) =>
  self.indexOf(value) === index;

const clean = (array: Array<any>) => array.filter((n) => n);

const shuffle = (arr: Array<any>) => {
  let currentIndex = arr.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
};

export const arrayUtils = { clean, distinct, shuffle };

// # pressureUtils

// Regex to validate Target (Ex.: Igor Santos <igor@nossascidades.org>)
// eslint-disable-next-line
const regexTargetEmail = /[a-zà-úA-ZÀ-Ú\s]+<(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))>/;
const isValidTargetEmail = (value: any) => regexTargetEmail.test(value);

// Regex to validate target with phone number
const regexTargetPhone = /^[a-zà-úA-ZÀ-Ú\s']+\s<(\+\d{2})?\d{6,7}-?\d{4}>$/;
const isValidTargetPhone = (value: any) => regexTargetPhone.test(value);

const PRESSURE_TYPE_EMAIL = 'email';
const PRESSURE_TYPE_PHONE = 'phone';

const getType = (targets: Array<any> = []) => {
  if (targets.length) {
    if (isValidTargetEmail(targets[0])) return PRESSURE_TYPE_EMAIL;
    if (isValidTargetPhone(targets[0])) return PRESSURE_TYPE_PHONE;
    return 'invalid';
  }
  return 'invalid';
};

export const pressureUtils = {
  getType,
  PRESSURE_TYPE_EMAIL,
  PRESSURE_TYPE_PHONE,
};

// # validateUtils
// eslint-disable-next-line
const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isValidEmail = (email: string) => regexEmail.test(email);

// Regex to validate phone numver in E.164 format
// Validating only BRA phone numbers for now
const regexPhoneE164 = /^\+\d{12,13}$/;

const isValidPhoneE164 =
  ({ code, invalid }: { code: string; invalid: string }) =>
  (value: string) => {
    const phoneE164 = /^\+/.test(value) ? value : `+${value}`;
    const message = [11, 12].includes(phoneE164.length) ? code : invalid;
    return regexPhoneE164.test(phoneE164) ? undefined : message;
  };

const checkEmailTargetsList =
  (message: string, targetList: Array<any>) => (value: string) =>
    targetList.some((target) => target.match(`<${value}>`))
      ? message
      : undefined;

const checkPhoneTargetsList =
  (message: string, targetList: Array<any>) => (value: string) =>
    targetList.some((target) =>
      target.replace(/\D/g, '').match(`${value.replace(/\D/g, '')}`)
    )
      ? message
      : undefined;

export const parseTarget = (target: string) => {
  const targetSplit = target.split('<');
  const valid = targetSplit.length === 2;
  return valid
    ? { name: targetSplit[0]?.trim(), value: targetSplit[1]?.replace('>', '') }
    : null;
};

export const getEmailTarget = (target: string) => {
  const targetSplit = target.split('<');
  return targetSplit[1]?.replace('>', '');
};

export const getTargetList = (targets: any): Array<string> => {
  if (typeof targets === 'object') return targets;

  return targets.split(';').filter((target: string) => !!target.trim());
};

export const validateUtils = {
  isValidEmail,
  isValidPhoneE164,
  checkEmailTargetsList,
  checkPhoneTargetsList,
};
