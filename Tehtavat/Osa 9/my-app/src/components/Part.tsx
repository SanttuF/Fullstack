import { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          {part.description}
        </p>
      );
    case 'group':
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          Group projects: {part.groupProjectCount}
        </p>
      );
    case 'background':
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          {part.description}
          <br />
          <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
        </p>
      );
    case 'special':
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          {part.description}
          <br />
          requirements: {part.requirements.map((r) => r)}
        </p>
      );
  }
};

export default Part;
