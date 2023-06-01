interface returnStats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// const typeCheck = (target: string, hours: string[]): [number, number[]] => {
//   if (target === undefined) throw new Error('No target');
//   if (hours.length === 0) throw new Error('No hours given');

//   const targetN: number = Number(target);
//   if (isNaN(Number(targetN))) throw new Error('Target not number');

//   const hoursN: number[] = [];
//   hours.forEach((n) => {
//     const nN: number = Number(n);
//     if (isNaN(nN)) throw new Error('Hours contain non numbers');
//     hoursN.push(nN);
//   });

//   return [targetN, hoursN];
// };

const rate = (average: number, target: number): [number, string] => {
  if (average < target - 0.1) return [1, 'bad'];
  else if (average > target + 0.1) return [3, 'good'];
  else return [2, 'okay'];
};

const calculateExercises = (hours: number[], target: number): returnStats => {
  const periodLength: number = hours.length;
  const trainingDays: number = hours.filter((h) => h !== 0).length;
  const average: number = hours.reduce((s, h) => s + h, 0) / periodLength;
  const success: boolean = average >= target;
  const [rating, ratingDescription]: [number, string] = rate(average, target);

  // const [rating, ratingDescription] = (): [number, string] => {
  //   if (average < target - 0.1) return [1, 'bad'];
  //   else if (average > target + 0.1) return [3, 'good'];
  //   else return [2, 'okay'];
  // };

  return {
    periodLength,
    trainingDays,
    average,
    success,
    rating,
    ratingDescription,
    target,
  };
};

// if (process.argv.length <= 2) {
//   console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
// } else {
//   try {
//     const [, , target, ...hours] = process.argv;
//     const [t, h]: [number, number[]] = typeCheck(target, hours);
//     console.log(calculateExercises(h, t));
//   } catch (e: unknown) {
//     if (e instanceof Error) console.log(e.message);
//     else console.log('error');
//   }
// }

export default calculateExercises;
