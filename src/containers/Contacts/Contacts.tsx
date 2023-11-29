import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axios-api.ts';
import SocialLink from '../../components/SocialLink/SocialLink.tsx';
import {Email} from '../../types';

const Contacts = () => {
  const [email, setEmail] = useState<Email>({
    info: '',
    editor: '',
    partnerships: '',
  });

  const getEmail = useCallback(async () => {
    try {
      const email = await axiosApi.get<Email>('/email.json');
      setEmail(email.data);
    } catch (error: Error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    void getEmail();
  }, []);

  return (
    <div>
      <h1>Контакты My Blog</h1>
      <p>Мы всегда рады общению с нашими читателями и сотрудничеству с единомышленниками.
        Если у вас есть вопросы, предложения или просто хочется поделиться своим мнением, воспользуйтесь одним из
        способов связи ниже:
      </p>
      <h2>Электронная почта:</h2>
      <ul>
        <li>Общие вопросы и предложения: <a href="#">{email.info}</a></li>
        <li>Редакция: <a href="#">{email.editor}</a></li>
      </ul>
      <h3 className="my-3">Почтовый адрес:</h3>
      <p>My Blog
        Улица, Город, Почтовый индекс
        Страна
      </p>
      <h2>Сотрудничество и реклама:</h2>
      <p>
        Если вы заинтересованы в сотрудничестве с My Blog или размещении рекламы, пожалуйста, свяжитесь с нашим отделом
        по сотрудничеству по адресу <a href="#">{email.partnerships}</a>.
        Мы ценим ваше внимание к My Blog и всегда готовы к диалогу. Наша цель - создавать контент, который вас
        вдохновляет и приносит пользу.
        Спасибо за то, что делаете нас частью вашего онлайн-путешествия!
      </p>
      <h3 className="my-3">Социальные сети:</h3>
      <SocialLink/>
    </div>
  );
};

export default Contacts;