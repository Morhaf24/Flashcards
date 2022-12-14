const { view, tableView } = require("./View.js");
const { app } = require("./App.js");

test("Table check view", () => {
    const cards = [];
    const checkedTable = tableView("dispatch",cards);
    expect(checkedTable.children[0].text).toBe("No Cards yet!");
    const cardsSecond = [{},{}];
    const checkedTableSecond = tableView("dispatch",cardsSecond);
    expect(checkedTableSecond.children[0].text).not.toBe("No Cards yet!");
});
