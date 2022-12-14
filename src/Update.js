const R = require('ramda');

const MASSAGES = {
  SHOW_FORM: 'SHOW_FORM',
  description_INPUT: 'description_INPUT',
  ANSWER_INPUT: 'ANSWER_INPUT',
  SAVE_CARD: 'SAVE_CARD',
  DELETE_CARD: 'DELETE_CARD',
  ANSWER_SHOW: 'ANSWER_SHOW'
};

function showFormMassage(showForm) {
  return {
    type: MASSAGES.SHOW_FORM,
    showForm,
  };
}

function frontInputMassage(description) {
  return {
    type: MASSAGES.description_INPUT,
    description,
  };
}

function backInputMassage(back) {
  return {
    type: MASSAGES.ANSWER_INPUT,
    back,
  };
}

const saveCardMassage = { type: MASSAGES.SAVE_CARD };

function deleteCardMassage(id) {
  return {
    type: MASSAGES.DELETE_CARD,
    id,
  };
}

function showAnswer(id, showAnswer = "", changeTextStatus = 1, changeddescription = "", changedAnswer = "") {
  if (changedAnswer=== "") {
    return {
      type: MASSAGES.ANSWER_SHOW,
      id,
      showAnswer,
      changeTextStatus,
      changedValue: changeddescription,
      changeType: 1
    };
  } 
  return {
    type: MASSAGES.ANSWER_SHOW,
    id,
    showAnswer,
    changeTextStatus,
    changedValue: changedAnswer,
    changeType: 2
  };
}

function update(massage, model) {
  switch (massage.type) {
    case MASSAGES.ANSWER_SHOW: {
      const id = massage.id ;

      const estimateData = massage.showAnswer;
      const estimate = estimateData.split(' ');
      const estimateText = estimate[0];
      const estimatescore = estimate[1];

      const toogle = massage.changeTextStatus;
      const neuValue = massage.changedValue;
      const oneCard = R.filter(
        card => card.id == id
      , model.cards);
      if (neuValue === "") {
        const card = {id:oneCard[oneCard.length - 1].id + 1, description:oneCard[0].description, back:oneCard[0].back, toogle: toogle, answerStatus: estimateText, score: estimatescore};
        const cards = [...model.cards, card]
        return {...model, cards, nextId: card.id, description: '',
        back: 0,
        showForm: false,
        toogle: toogle,
        answerStatus: ""
        };
      } else if (massage.changeType == 1) {
        const card = {id:oneCard[oneCard.length - 1].id + 1, description:neuValue, back:oneCard[0].back, toogle: toogle, answerStatus: estimateText, score: estimatescore};
        const cards = [...model.cards, card]
        console.log(cards);
        return {...model, cards, nextId: card.id, description: '',
        back: 0,
        showForm: false,
        toogle: toogle,
        answerStatus: ""
        };
      }
      const card = {id:oneCard[oneCard.length - 1].id + 1, description:oneCard[0].description, back:neuValue, toogle: toogle, answerStatus: estimateText, score: estimatescore};
      const cards = [...model.cards, card]
      console.log(cards);
      return {...model, cards, nextId: card.id, description: '',
      back: 0,
      showForm: false,
      toogle: toogle,
      answerStatus: ""
      };
    }
    case MASSAGES.SHOW_FORM: {
      const { showForm } = massage;
      return { ...model, showForm, description: '', back: 0 };
    }
    case MASSAGES.description_INPUT: {
      const { description } = massage;
      return { ...model, description };
    }
    case MASSAGES.ANSWER_INPUT: {
      const back = R.pipe( 
        R.defaultTo(0),
      )(massage.back);
      return { ...model, back };
    }
    case MASSAGES.SAVE_CARD: {
      const updatedModel = add(model);
      return updatedModel;
    }
    case MASSAGES.DELETE_CARD: {
      const { id } = massage;
      const cards = R.filter(
        card => card.id !== id
      , model.cards);
      return { ...model, cards };
    }
  }
  return model;
}

function add(model) {
  const { nextId, description, back, toogle } = model;
  const card = { id: nextId + 1, description, back, toogle:0};
  const cards = [...model.cards, card]
  return {
    ...model,
    cards,
    nextId: nextId + 1,
    description: '',
    back: 0,
    showForm: false,
    toogle: 0,
    score: 0
  };
}

module.exports = {update, MASSAGES, add, showFormMassage, frontInputMassage, backInputMassage, saveCardMassage, deleteCardMassage, showAnswer};