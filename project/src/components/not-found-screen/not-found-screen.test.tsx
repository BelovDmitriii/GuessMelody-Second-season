import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import NotFoundScreen from './not-found-screen';
import { render, screen } from '@testing-library/react';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history} >
        <NotFoundScreen />
      </HistoryRouter>
    );

    const headerElement = screen.getByText('404. Page not found');
    const linkElement = screen.getByText('Вернуться на главную');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
