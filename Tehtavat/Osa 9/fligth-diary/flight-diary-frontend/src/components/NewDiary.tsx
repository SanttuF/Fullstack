import { useState } from 'react';
import { Diary, NewDiaryEntry, Visibility, Weather } from '../types';
import { addDiary } from '../diaryService';

const NewDiary = ({
  updateDiaries,
}: {
  updateDiaries: (diary: Diary) => void;
}) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [noti, setNoti] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diary: NewDiaryEntry = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment,
    };
    addDiary(diary).then((res) => {
      if (typeof res === 'string') {
        notify(res);
      } else {
        const rDiary: Diary = {
          id: res.id,
          visibility: res.visibility,
          weather: res.weather,
          date: res.date,
        };
        updateDiaries(rDiary);
      }
    });
  };

  const notify = (msg: string): void => {
    setNoti(msg);
    setTimeout(() => setNoti(''), 5000);
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {noti === '' ? null : noti}

      <form onSubmit={handleSubmit}>
        <input
          type="date"
          id="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <br />
        <div>
          <input
            type="radio"
            id="sunny"
            name="weather"
            value="sunny"
            onChange={({ target }) => setWeather(target.value)}
          />
          <label htmlFor="sunny">sunny</label>
          <input
            type="radio"
            id="rainy"
            name="weather"
            value="rainy"
            onChange={({ target }) => setWeather(target.value)}
          />
          <label htmlFor="rainy">rainy</label>
          <input
            type="radio"
            id="cloudy"
            name="weather"
            value="cloudy"
            onChange={({ target }) => setWeather(target.value)}
          />
          <label htmlFor="cloudy">cloudy</label>
          <input
            type="radio"
            id="stormy"
            name="weather"
            value="stormy"
            onChange={({ target }) => setWeather(target.value)}
          />
          <label htmlFor="stormy">stormy</label>
          <input
            type="radio"
            id="windy"
            name="weather"
            value="windy"
            onChange={({ target }) => setWeather(target.value)}
          />
          <label htmlFor="windy">windy</label>
        </div>
        <div>
          <input
            type="radio"
            id="great"
            name="visibility"
            value="great"
            onChange={({ target }) => setVisibility(target.value)}
          />
          <label htmlFor="great">great</label>
          <input
            type="radio"
            id="good"
            name="visibility"
            value="good"
            onChange={({ target }) => setVisibility(target.value)}
          />
          <label htmlFor="good">goold</label>
          <input
            type="radio"
            id="ok"
            name="visibility"
            value="ok"
            onChange={({ target }) => setVisibility(target.value)}
          />
          <label htmlFor="ok">ok</label>
          <input
            type="radio"
            id="poor"
            name="visibility"
            value="poor"
            onChange={({ target }) => setVisibility(target.value)}
          />
          <label htmlFor="poor">poor</label>
        </div>
        <input
          type="text"
          placeholder="comment"
          id="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default NewDiary;
