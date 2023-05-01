import {render, screen} from '@testing-library/react';
import withAudioPlayer from './with-audio-player';
import { makeFakeQuestionArtist } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import QuestionArtistScreen from '../../components/question-artist-screen/question-artist-screen';
import HistoryRouter from '../../components/history-route/history-route';

jest.mock('../../components/audio-player/audio-player', () => {
  const mockAudioPlayer = () => <>This is mock AudioPlayer</>;

  return{
    __esModule: true,
    default: mockAudioPlayer,
  };
});

describe('HOC: withAudioPlayer', () => {
  it('компонент должен рендериться корректно, используя HOC', () => {
    const BaseComponentWrapped = withAudioPlayer(() => <h1>withAudioPlayer</h1>);

    render(<BaseComponentWrapped />);
    expect(screen.getByText(/withAudioPlayer/i)).toBeInTheDocument();
  });

  it('компонент должен рендерить корректно другой компонент с пропсами', () => {
    const mockQuestion = makeFakeQuestionArtist();
    const history = createMemoryHistory();

    const BaseComponentWrapped = withAudioPlayer(QuestionArtistScreen);

    render(
      <HistoryRouter history={history}>
        <BaseComponentWrapped
          onAnswer={jest.fn()}
          question={mockQuestion}
        >
          <p>This is children component</p>
        </BaseComponentWrapped>
      </HistoryRouter>,
    );

    expect(screen.getByText(/This is children component/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock AudioPlayer/i)).toBeInTheDocument();
    expect(screen.getByText(/This is children component/i)).toBeInTheDocument();
  });
});
