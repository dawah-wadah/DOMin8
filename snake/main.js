const $w = require("../lib/main.js");
import GameView from './game_view';

document.addEventListener('DOMContentLoaded', () => {
  $w('.new-game').removeClass('hidden');
  const rootEl = $w('.grid');
  const view = new GameView(rootEl);
  $w('.new-game').on('click', () => {
    view.gameInterval = setInterval( view.step.bind(view), 100);

    $w('.new-game').addClass('hidden');
  });
});
