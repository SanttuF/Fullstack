import patients from '../../data/patients';
import { NonSensitivePatient, NewPatient, Patient, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';
// import { parseDiagnosisCodes } from '../utils';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender: gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, newEntry: NewEntry): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  console.log(newEntry);

  if (!patient) throw new Error('No patient with that id' + id);

  const entry = { ...newEntry, id: uuid() };

  const newPatient = {
    ...patient,
    entries: patient.entries.concat(entry),
  };

  const i = patients.findIndex((p) => p.id === id);
  patients[i] = newPatient;

  return newPatient;
};

export default {
  getPatients,
  addPatient,
  findById,
  addEntry,
};
