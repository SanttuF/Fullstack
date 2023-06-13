import express from 'express';
import patientService from '../services/patients';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = utils.toNewPatient(req.body);
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

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = utils.toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    res.status(201).json(addedEntry);
    console.log(addedEntry);
  } catch (error: unknown) {
    let msg = 'Error:';
    if (error instanceof Error) {
      msg += error.message;
    }
    res.status(400).send(msg);
  }
});

export default router;
