import axios from 'axios';
import { Diary, DiaryEntry, NewDiaryEntry } from './types';

const baseURI = 'http://localhost:3001/api/diaries';

export const getAllDiaries = () => {
  return axios.get<Diary[]>(baseURI).then((res) => res.data);
};

export const addDiary = (diary: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry | string>(baseURI, diary)
    .then((res) => res.data)
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      }
    });
};
