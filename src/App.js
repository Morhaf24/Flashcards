const { diff, patch } = require("virtual-dom");
const createElement = require("virtual-dom/create-element");
const { deleteCardMassage } = require("./Update.js");
const R = require('ramda');


function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function dispatch(massage){
    if (massage.type === "ANSWER_SHOW") {
      const updatedModel = update(massage, model);
      model = updatedModel;
      const updatedView = view(dispatch, model);
      const patches = diff(currentView, updatedView);
      rootNode = patch(rootNode, patches);
      currentView = updatedView;
      dispatch(deleteCardMassage(updatedModel.nextId-1));
    } else {
      model = update(massage, model);
      const newModel = model.cards;
      const trueCardsSequence = R.sortBy(R.prop('score'), newModel);
      model.cards = trueCardsSequence;
      const updatedView = view(dispatch, model);
      const patches = diff(currentView, updatedView);
      rootNode = patch(rootNode, patches);
      currentView = updatedView;
    }
  }
}

module.exports = {app};