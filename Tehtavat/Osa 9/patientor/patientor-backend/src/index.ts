import express from 'express';
import diagnoseRouter from './routes/diagnose';
import pingRouter from './routes/ping';
import patientRouter from './routes/patient';
import cors from 'cors';

const app = express();
app.use(express.json());

//eslint-disable-next-line
app.use(cors());

app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
