'use strict';
var CLOUD_WIDTH = 300;
var CLOUD_HEIGHT = 180;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var BORDER_GAP = 30;
var GAP = 10;
var FONT_HEIGHT = 15;
var TEXT_WIDTH = 52;
var BAR_WIDTH = 40;
var maxBarHeight = 50;
var winnerIndex = 0;
var player = {
  name: '',
  playerIndex: 0,
  playerTime: 0,
  maxTime: 0,
  minTime: 0
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(x + 10, y + 10, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderBar = function (ctx, x, y, currentPlayer) {
  // максимально возможная высота столбца
  maxBarHeight = CLOUD_HEIGHT - (CLOUD_Y + BORDER_GAP + FONT_HEIGHT) - 2 * (GAP + FONT_HEIGHT);
  var koefDiagramm = Math.round(currentPlayer.minTime / 1.2);
  var maxTime = Math.round(currentPlayer.maxTime - koefDiagramm);
  var barHeight = Math.round(maxBarHeight * (currentPlayer.playerTime - koefDiagramm) / maxTime);
  // Рисуем имя игрока
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText(currentPlayer.name, x + 1, y);
  // рисуем столбик диаграммы
  ctx.fillStyle = 'hsl(' + currentPlayer.playerIndex * 62 + ' , 95%, 46%)';
  y = y - barHeight - FONT_HEIGHT;
  ctx.fillRect(x, y, BAR_WIDTH, barHeight);
  // рисуем сверху время игрока
  ctx.fillStyle = '#000';
  ctx.fillText(Math.round(currentPlayer.playerTime / 10) / 100, x, y - GAP / 2);
};

window.renderStatistics = function (ctx, names, times) {
  var minTime = times[0];
  var winnerText = '';
  var maxTime = 0;
  var barX;
  var barY;
  var i = 0;
  // Рисуем облако
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  // Находим минимальное время
  winnerIndex = 0;
  for (i = 1; i < times.length; i += 1) {
    if (times[i] < minTime) {
      minTime = times[i];
      winnerIndex = i;
    }
  }
  // Выводим надпись с именем победителя
  winnerText = 'Победил(а) ' + names[winnerIndex] + ' !';
  if (names[winnerIndex] === 'Вы') {
    winnerText = 'Ура ' + names[winnerIndex] + ' победили!';
  }
  ctx.fillStyle = '#000';
  ctx.fillText(winnerText, CLOUD_X + BORDER_GAP, CLOUD_Y + BORDER_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + BORDER_GAP, CLOUD_Y + BORDER_GAP + FONT_HEIGHT);
  // Находим максимальное время
  maxTime = times[0];
  for (i = 1; i < times.length; i += 1) {
    if (times[i] > maxTime) {
      maxTime = times[i];
    }
  }
  // Отрисовываем столбцы диаграммы
  for (i = 0; i < names.length; i += 1) {
    barX = CLOUD_X + BORDER_GAP + GAP * i + TEXT_WIDTH * i;
    barY = CLOUD_Y + CLOUD_HEIGHT - BORDER_GAP / 2;
    player.name = names[i];
    player.playerIndex = i;
    player.playerTime = Math.round(times[i]);
    player.maxTime = Math.round(maxTime);
    player.minTime = Math.round(minTime);
    renderBar(ctx, barX, barY, player);
  }
};
