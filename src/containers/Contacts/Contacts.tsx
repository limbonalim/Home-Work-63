import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axios-api';
import SocialLink from '../../components/SocialLink/SocialLink';
import Loading from '../../components/Loading/Loading';
import {Email} from '../../types';

interface Props {
  url: string;
  getError: (message: string) => void;
}

const Contacts: React.FC<Props> = React.memo(function Contacts({url, getError}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<Email>({
    info: '',
    editor: '',
    partnerships: '',
  });

  const getEmail = useCallback(async () => {
    try {
      setLoading(true);
      const email = await axiosApi.get<Email>(url);
      setEmail(email.data);
    } catch (error: Error) {
      getError(error.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    void getEmail();
  }, [getEmail]);

  return (
    <>
      {loading ? <Loading/> :
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
            Если вы заинтересованы в сотрудничестве с My Blog или размещении рекламы, пожалуйста, свяжитесь с нашим
            отделом
            по сотрудничеству по адресу <a href="#">{email.partnerships}</a>.
            Мы ценим ваше внимание к My Blog и всегда готовы к диалогу. Наша цель - создавать контент, который вас
            вдохновляет и приносит пользу.
            Спасибо за то, что делаете нас частью вашего онлайн-путешествия!
          </p>
          <h3 className="my-3">Социальные сети:</h3>
          <SocialLink/>
        </div>
      }
    </>
  );
}, (prevProps, nextProps) => {
  return prevProps.url === nextProps.url;
});

export default Contacts;