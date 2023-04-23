import { render } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: LoadingScreen', () => {
  test('должен отрисовываться правильно', () => {
    const {container} = render(<LoadingScreen />);

    expect (container).toMatchSnapshot();
  });
});
