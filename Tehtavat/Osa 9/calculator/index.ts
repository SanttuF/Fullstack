import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.json({ error: 'malformatted parameters' });
  }

  res.json({
    weight,
    height,
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    res.json({ error: 'parameters missing' });
  }

  const targetN = Number(target);
  if (isNaN(Number(targetN))) res.json({ error: 'malformatted parameters' });
  if (!(daily_exercises instanceof Array)) {
    res.json({ error: 'malformatted parameters' });
    return;
  }

  const hours: number[] = [];
  daily_exercises.forEach((n) => {
    const nN = Number(n);
    if (isNaN(nN)) {
      res.json({ error: 'malformatted parameters' });
      return;
    }
    hours.push(nN);
  });

  res.json(calculateExercises(hours, targetN));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
