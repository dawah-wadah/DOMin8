import $l from '../lib/main.js';
import GameView from './game_view';

document.addEventListener('DOMContentLoaded', () => {
  $l('.new-game').removeClass('hidden');
  const rootEl = $l('.grid');
  const view = new GameView(rootEl);
  $l('.new-game').on('click', () => {
    view.gameInterval = setInterval( view.step.bind(view), 100);

    $l('.new-game').addClass('hidden');
  });
});
