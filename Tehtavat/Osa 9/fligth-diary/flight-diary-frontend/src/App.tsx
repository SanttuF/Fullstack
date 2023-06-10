import { useEffect, useState } from 'react';
import { Diary } from './types';
import { getAllDiaries } from './diaryService';
import Diaries from './components/Diaries';
import NewDiary from './components/NewDiary';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const updateDiaries = (diary: Diary) => {
    setDiaries(diaries.concat(diary));
  };

  return (
    <>
      <NewDiary updateDiaries={updateDiaries} />
      <Diaries diaries={diaries} />
    </>
  );
};

export default App;
