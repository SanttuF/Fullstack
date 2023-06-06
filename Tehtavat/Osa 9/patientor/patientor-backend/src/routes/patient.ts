import express from 'express';
import patientService from '../services/patients';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.status(201).json(addedPatient);
  } catch (error: unknown) {
    let msg = 'Error:';
    if (error instanceof Error) {
      msg += error.message;
    }
    res.status(400).send(msg);
  }
});

export default router;
