import React, {useCallback, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axiosApi from '../../axios-api';
import Loading from '../../components/Loading/Loading';
import {AboutData} from '../../types';

interface Props {
  getError: (message: string) => void;
}

const About: React.FC<Props> = ({getError}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AboutData>({
    contacts: '',
    contactsTwo: '',
    ourMission: '',
    welcome: '',
    whatWillYouFindHere: '',
    whoAreWe: '',
  });

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get<AboutData>('/about.json');
      setData(response.data);
    } catch (error: Error) {
      getError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void getData();
  }, [getData]);

  return (
    <>
      {loading ? <Loading/> :
        <div>
          <h1>Добро пожаловать на My Blog!</h1>
          <p>{data.welcome}</p>
          <h3>Кто мы?</h3>
          <p>{data.whoAreWe}</p>
          <h3>Что вы найдете здесь?</h3>
          <p>{data.whatWillYouFindHere}</p>
          <h3>Наша миссия</h3>
          <p>{data.ourMission}</p>
          <h3>Связь с нами</h3>
          <p>{data.contacts} <Link to="/contacts">связаться с нами</Link> {data.contactsTwo}</p>
        </div>}
    </>
  );
};

export default About;