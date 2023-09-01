import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part, i) => (
        <Part key={i} part={part} />
      ))}
    </>
  );
};

export default Content;
