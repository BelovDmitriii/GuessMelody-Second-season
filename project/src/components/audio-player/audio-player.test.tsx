import { fireEvent, render, screen } from '@testing-library/react';
import AudioPlayer from './audio-player';
import userEvent from '@testing-library/user-event';

describe('Component: AudioPlayer', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });

  it('должен отрисоваться правильно', () => {
    const mockPath = 'mock-path';

    render(
      <AudioPlayer
        isPlaying
        src={mockPath}
        onPlayButtonClick={jest.fn()}
      />
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('audio')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
    expect(screen.getByRole('button')).toHaveClass('track__button--pause');
  });

  it('должен играть мелодию, когда данные загружены', () => {
    const mockPath = 'mock-path';
    const playButtonClickHandle = jest.fn();

    render(
      <AudioPlayer
        isPlaying
        src={mockPath}
        onPlayButtonClick={playButtonClickHandle}
      />
    );

    expect(screen.getByRole('button')).toHaveClass('track__button--pause');

    fireEvent(screen.getByTestId('audio') as Element,
      new Event('lodeddata'));

    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
    screen.getByRole('button').classList.contains('track__button--play');

    userEvent.click(screen.getByRole('button'));
    expect(playButtonClickHandle).toBeCalled();
  });
});
