import {
  Diagnosis,
  Discharge,
  Gender,
  HealthCheckRating,
  NewEntry,
  NewPatient,
  SickLeave,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (comment: unknown): string => {
  if (!isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'gender' in object &&
    'occupation' in object &&
    'ssn' in object &&
    'dateOfBirth' in object
  ) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      occupation: parseString(object.occupation),
      ssn: parseString(object.ssn),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      entries: [],
    };

    return newPatient;
  }

  throw new Error('Missing input field');
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const isHealthRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((g) => g.valueOf())
    .includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !isHealthRating(rating)) {
    throw new Error('Incorrect HealthCkeckRating' + rating);
  }
  return rating;
};

const isSickLeave = (param: unknown): param is SickLeave => {
  if ((param as SickLeave).startDate && (param as SickLeave).endDate) {
    return true;
  }
  return false;
};

const parseSickLeave = (leave: unknown): SickLeave => {
  if (isSickLeave(leave)) {
    if (parseDate(leave.startDate) && parseDate(leave.endDate)) {
      return leave;
    }
  }
  throw new Error('Incorrect sick leave' + leave);
};

const isDischarge = (param: unknown): param is Discharge => {
  if ((param as Discharge).date && (param as Discharge).criteria) {
    return true;
  }
  return false;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    !isDischarge(discharge) ||
    !isDate(discharge.date) ||
    !isString(discharge.criteria)
  ) {
    throw new Error('Incorrect discharge' + discharge);
  }
  return discharge;
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'type' in object
  ) {
    switch (object.type) {
      case 'HealthCheck':
        if ('healthCheckRating' in object) {
          const newEntry: NewEntry = {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            type: object.type,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            diagnosisCodes: parseDiagnosisCodes(object),
          };
          return newEntry;
        }

        throw new Error('Missing input field: healthCheck');

      case 'OccupationalHealthcare':
        if ('employerName' in object) {
          const newEntry: NewEntry = {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            type: object.type,
            employerName: parseString(object.employerName),
            diagnosisCodes: parseDiagnosisCodes(object),
          };

          if ('sickLeave' in object) {
            newEntry.sickLeave = parseSickLeave(object.sickLeave);
          }

          return newEntry;
        }
        throw new Error('Missing input field');

      case 'Hospital':
        if ('discharge' in object) {
          const newEntry: NewEntry = {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            type: object.type,
            discharge: parseDischarge(object.discharge),
            diagnosisCodes: parseDiagnosisCodes(object),
          };
          return newEntry;
        }

        throw new Error('Missing input field');
    }
  }

  throw new Error('Missing input field: main');
};

export default { toNewPatient, toNewEntry };
