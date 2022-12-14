//const { test } = require("ramda");
const { add, MASSAGES, update, showFormMassage, questionInputMassage, answerInputMassage, saveCardMassage, deleteCardMassage, answerShow} = require("./Update.js");

test("ADD", () => {
    const model = { cards: [{},{}],nextId:1, question:"How much", answer:"IDK", toogle:0};
    const newModel = add(model);
    expect(newModel.answer).toBe("IDK");
    expect(newModel.cards[2].id).toBe(model.nextId + 1);
    expect(newModel.cards[2].question).toBe("How much");
    expect(newModel.cards[2].toogle).toBe(0);
  });
test("showFormMassage", () => {
    const falseShow = showFormMassage(false);
    const trueShow = showFormMassage(true);
    expect(falseShow.type).toBe("SHOW_FORM");
    expect(trueShow.type).toBe("SHOW_FORM");
    expect(falseShow.showForm).toBe(false);
    expect(trueShow.showForm).toBe(true);
});
