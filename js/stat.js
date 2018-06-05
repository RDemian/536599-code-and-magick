'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var BORDER_GAP = 50;
var GAP = 20;
var FONT_HEIGHT = 15;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var maxBarHeight = 50;
var winnerIndex = 0;
var player = {
  name: '',
  index: 0,
  time: 0,
  maxTime: 0,
  minTime: 0
};

var renderCloud = function (ctx, x, y, color) {
  var i = 0;
  // в первый проход отрисовывается тень облака, второй проход само облако.
  for (i = 0; i < 2; i += 1) {
    ctx.fillStyle = (i === 0) ? 'rgba(0, 0, 0, 0.7)' : color;
    ctx.beginPath();
    x = (i === 0) ? x + 10 : x - 10;
    y = (i === 0) ? y + 10 : y - 10;
    ctx.moveTo(x, y);
    ctx.lineTo(x + CLOUD_WIDTH, y);
    ctx.bezierCurveTo(x + CLOUD_WIDTH - 30, y + CLOUD_HEIGHT / 3, x + CLOUD_WIDTH + 35, y + CLOUD_HEIGHT / 2, x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
    ctx.lineTo(x, y + CLOUD_HEIGHT);
    ctx.fill();
  }
};

var renderBar = function (ctx, x, y, currentPlayer) {
  // максимально возможная высота столбца
  maxBarHeight = CLOUD_HEIGHT - (CLOUD_Y + BORDER_GAP + FONT_HEIGHT) - 2 * (GAP + FONT_HEIGHT);
  var koefDiagramm = Math.round(currentPlayer.minTime / 1.2);
  var maxTime = Math.round(currentPlayer.maxTime - koefDiagramm);
  var barHeight = Math.round(maxBarHeight * (currentPlayer.time - koefDiagramm) / maxTime);
  // Рисуем имя игрока
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText(currentPlayer.name, x + 1, y);
  // рисуем столбик диаграммы
  ctx.fillStyle = (currentPlayer.name === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + (10 + (currentPlayer.index * 30)) + '%, 60%)';
  y = y - barHeight - FONT_HEIGHT;
  ctx.fillRect(x, y, BAR_WIDTH, barHeight);
  // рисуем сверху время игрока
  ctx.fillStyle = '#000';
  ctx.fillText(Math.round(currentPlayer.time / 10) / 100, x, y - GAP / 2);
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
    player.index = i;
    player.time = Math.round(times[i]);
    player.maxTime = Math.round(maxTime);
    player.minTime = Math.round(minTime);
    renderBar(ctx, barX, barY, player);
  }
};
