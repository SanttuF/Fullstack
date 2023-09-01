const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = (weight / (height * height)) * 10000;

  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi < 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

// const typeCheckBmi = (h: string, w: string): [number, number] => {
//   const height: number = Number(h);
//   const weight: number = Number(w);

//   if (isNaN(height) || isNaN(weight)) throw new Error('input(s) not number(s)');

//   return [height, weight];
// };

// if (process.argv.length <= 2) {
//   for (let i: number = 140; i < 200; i += 10) {
//     for (let j: number = 40; j < 100; j += 10) {
//       console.log(calculateBmi(i, j));
//     }
//   }
// } else {
//   try {
//     const [, , height, weight] = process.argv;
//     const [h, w]: [number, number] = typeCheckBmi(height, weight);
//     console.log(calculateBmi(h, w));
//   } catch (e: unknown) {
//     if (e instanceof Error) console.log(e.message);
//     else console.log('error');
//   }
// }

export default calculateBmi;
