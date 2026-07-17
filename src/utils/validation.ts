import type { BirthDate } from '../components/BirthDateInput';
import type { BirthTime } from '../components/BirthTimeInput';
import type { CalendarValue } from '../components/CalendarSelector';

export type BirthDateErrors = {
  year?: string;
  month?: string;
  day?: string;
  common?: string;
};

export type BirthTimeErrors = {
  hour?: string;
  minute?: string;
  common?: string;
};

export type BirthFormValues = {
  name: string;
  calendar: CalendarValue;
  birthDate: BirthDate;
  birthTime: BirthTime;
};

export type BirthFormErrors = {
  name?: string;
  birthDate?: BirthDateErrors;
  birthTime?: BirthTimeErrors;
};

export type ValidationResult = {
  isValid: boolean;
  errors: BirthFormErrors;
};

export function validateBirthForm(
  values: BirthFormValues,
): ValidationResult {
  const errors: BirthFormErrors = {};

  const nameError = validateName(values.name);

  if (nameError) {
    errors.name = nameError;
  }

  const birthDateErrors = validateBirthDate(
    values.birthDate,
    values.calendar,
  );

  if (Object.keys(birthDateErrors).length > 0) {
    errors.birthDate = birthDateErrors;
  }

  const birthTimeErrors = validateBirthTime(
    values.birthTime,
  );

  if (Object.keys(birthTimeErrors).length > 0) {
    errors.birthTime = birthTimeErrors;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateName(
  name: string,
): string | undefined {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return '이름을 입력해주세요.';
  }

  if (trimmedName.length < 2) {
    return '이름은 2자 이상 입력해주세요.';
  }

  if (trimmedName.length > 20) {
    return '이름은 20자 이하로 입력해주세요.';
  }

  return undefined;
}

export function validateBirthDate(
  birthDate: BirthDate,
  calendar: CalendarValue,
): BirthDateErrors {
  const errors: BirthDateErrors = {};

  const { year, month, day } = birthDate;

  if (!year) {
    errors.year = '연도를 입력해주세요.';
  }

  if (!month) {
    errors.month = '월을 입력해주세요.';
  }

  if (!day) {
    errors.day = '일을 입력해주세요.';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  if (!/^\d+$/.test(year)) {
    errors.year = '연도는 숫자로 입력해주세요.';
  } else if (year.length !== 4) {
    errors.year = '연도는 4자리로 입력해주세요.';
  }

  if (!/^\d+$/.test(month)) {
    errors.month = '월은 숫자로 입력해주세요.';
  }

  if (!/^\d+$/.test(day)) {
    errors.day = '일은 숫자로 입력해주세요.';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const yearNumber = Number(year);
  const monthNumber = Number(month);
  const dayNumber = Number(day);

  const currentYear = new Date().getFullYear();

  if (yearNumber < 1900 || yearNumber > currentYear) {
    errors.year =
      `연도는 1900년부터 ${currentYear}년 사이로 입력해주세요.`;
  }

  if (monthNumber < 1 || monthNumber > 12) {
    errors.month = '월은 1월부터 12월 사이로 입력해주세요.';
  }

  const maxDay =
    calendar.type === 'lunar' ? 30 : 31;

  if (dayNumber < 1 || dayNumber > maxDay) {
    errors.day =
      calendar.type === 'lunar'
        ? '음력 날짜는 1일부터 30일 사이로 입력해주세요.'
        : '날짜는 1일부터 31일 사이로 입력해주세요.';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  if (calendar.type === 'lunar') {
    return errors;
  }

  if (
    !isValidSolarDate(
      yearNumber,
      monthNumber,
      dayNumber,
    )
  ) {
    errors.common = '존재하지 않는 양력 날짜입니다.';
    return errors;
  }

  const inputDate = new Date(
    yearNumber,
    monthNumber - 1,
    dayNumber,
  );

  const today = new Date();

  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (inputDate > today) {
    errors.common = '미래 날짜는 입력할 수 없습니다.';
  }

  return errors;
}

export function validateBirthTime(
  birthTime: BirthTime,
): BirthTimeErrors {
  const errors: BirthTimeErrors = {};

  if (birthTime.unknown) {
    return errors;
  }

  const { hour, minute } = birthTime;

  if (!hour) {
    errors.hour = '시를 입력해주세요.';
  }

  if (!minute) {
    errors.minute = '분을 입력해주세요.';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  if (!/^\d+$/.test(hour)) {
    errors.hour = '시는 숫자로 입력해주세요.';
  }

  if (!/^\d+$/.test(minute)) {
    errors.minute = '분은 숫자로 입력해주세요.';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const hourNumber = Number(hour);
  const minuteNumber = Number(minute);

  if (hourNumber < 0 || hourNumber > 23) {
    errors.hour = '시는 0부터 23 사이로 입력해주세요.';
  }

  if (minuteNumber < 0 || minuteNumber > 59) {
    errors.minute = '분은 0부터 59 사이로 입력해주세요.';
  }

  return errors;
}

function isValidSolarDate(
  year: number,
  month: number,
  day: number,
): boolean {
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}