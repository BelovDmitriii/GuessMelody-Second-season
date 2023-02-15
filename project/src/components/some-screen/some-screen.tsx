import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts/consts';

function SomeScreen(): JSX.Element {
  const [count, setCount] = useState(101);
  const [isVisible, setVisible] = useState(true);

  const navigate = useNavigate();

  return(
    <>
      <button
        onClick={() => setCount(count + 1)}
      >
        Нажми, чтобы проверить
      </button>
      <div>
        {count}
      </div>
      <button
        onClick={() => setVisible((prevState) => !prevState)}
      >
        {isVisible ? '- Закрыть кнопку' : '+ Открыть кнопку'}
      </button>
      {isVisible &&
        <button
          onClick={() => navigate(AppRoute.Root)}
        >
        вернуться на главную страницу
        </button>}
    </>
  );
}

export default SomeScreen;
