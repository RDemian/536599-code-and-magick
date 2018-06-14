'use strict';

var setupOverlay = document.querySelector('.setup');

setupOverlay.classList.remove('hidden');

var similarWizards = [];
var setupSimilarList = document.querySelector('.setup-similar-list');
var setupSimilar = document.querySelector('.setup-similar');

function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

var createNewSimilar = function () {

  var similar = {
    name: '',
    coatColor: '',
    eyesColor: ''
  };
  var name = ['Иван', 'Хуан', 'Кристофер', 'Модест', 'Джорж'];
  var sername = ['Верон', 'Вальц', 'Нионго', 'Ирвинг', 'Вашингтон'];
  var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
  var k = 0;
  k = getRandomInt(0, name.length - 1);
  similar.name = name[k];
  k = getRandomInt(0, sername.length - 1);
  similar.name = similar.name + ' ' + sername[k];

  similarWizards.forEach(function (item) {
    if (item.name === similar.name) {
      similar.name = similar.name + ' ' + getRandomInt(2, 20) + '-й';
    }
  });
  k = getRandomInt(0, coatColor.length - 1);
  similar.coatColor = coatColor[k];
  k = getRandomInt(0, eyesColor.length - 1);
  similar.eyesColor = eyesColor[k];

  return similar;

};

var generateSimilarWizard = function (countWizards) {

  for (var i = 0; i < countWizards; i += 1) {
    similarWizards[i] = createNewSimilar();
  }

};

generateSimilarWizard(4);

// ********** Создание элементов на основе шаблона **********
// ********** Вывод элементов в документ **********
var appendNewSimilarWizards = function () {

  var fragment = document.createDocumentFragment();
  var similarWizardsTemplateContent = document.querySelector('#similar-wizard-template').content;
  var SimilarItem = similarWizardsTemplateContent.querySelector('.setup-similar-item');

  for (var i = 0; i < similarWizards.length; i += 1) {
    var newSimilarItem = SimilarItem.cloneNode(true);
    newSimilarItem.querySelector('.setup-similar-label').textContent = similarWizards[i].name;
    newSimilarItem.querySelector('.wizard-coat').style = 'fill: ' + similarWizards[i].coatColor;
    newSimilarItem.querySelector('.wizard-eyes').style = 'fill: ' + similarWizards[i].eyesColor;
    fragment.appendChild(newSimilarItem);
  }

  setupSimilarList.appendChild(fragment);
  setupSimilar.classList.remove('hidden');
};

appendNewSimilarWizards();
