import { Diary } from '../types';

const Diaries = ({ diaries }: { diaries: Diary[] }) => {
  return (
    <div>
      <h2>Diaries</h2>
      {diaries.map((d) => (
        <div key={d.id}>
          <h4>{d.date}</h4>
          <div>visibility: {d.visibility}</div>
          <div>weather: {d.weather}</div>
        </div>
      ))}
    </div>
  );
};

export default Diaries;
