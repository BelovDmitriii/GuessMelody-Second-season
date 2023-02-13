import { useState } from 'react';

function SomeScreen(): JSX.Element {
  const [count, setCount] = useState(101);
  const [isVisible, setVisible] = useState(true);

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
      <div>
        лучше этого не видеть
      </div>}
    </>
  );
}

export default SomeScreen;
