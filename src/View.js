const hh = require("hyperscript-helpers");
const { h } = require("virtual-dom");
import * as R from "ramda";
const { showCardMassage, FrontSideInputMassage, backSideInputMassage, saveFrontSideMassage, deleteCardMassage } = require("./Update");

const buttonStyle = "bg-blue-400 hover:bg-black text-white font-bold py-2 px-2 rounded";

const { div, button, form, label, input, thead, tbody, tr, th, td } = hh(h);

function cell(tag, className, value) {
  return tag({ className }, value);
}

const tableHeader = thead([tr([cell(th, "text-left text-red-900", "Cards")])]);

function cardRow(dispatch, className, card, backSide) {
  return div({ className: "w-60 h-60 bg-red-900 inline-block ml-2 text-ellipsis overflow-hidden" }, [
    cell(td, "px-1 py-2", card.description),
    cell(td, "px-1 py-2 text-right", [
      button(
        {
          className: "bg-red-500 text-white hover:bg-black p-2 rounded",
          onclick: () => dispatch(deleteCardMassage(card.id)),
        },
        "Delete"
      ),
    ]),
    button(
      { 
        className: "hover:bg-black text-white text-sm underline ",
        onclick: () => dispatch(backSideInputMassage(card.id))
      },
      "Show Answer"
      ),
    cell(td, "", [
      button(
        { 
          className: "bg-red-500 hover:bg-black text-white font-bold py-1 px-1 rounded",
          onclick: () => dispatch()
        },
        "Bad"
      ),
      button(
        { 
          className: "bg-blue-500 hover:bg-black text-white font-bold py-1 px-1 rounded ml-2",
          onclick: () => dispatch()
        },
        "Good"
      ),
      button(
        { 
          className: "bg-green-500 hover:bg-black text-white font-bold py-1 px-1 rounded ml-2",
          onclick: () => dispatch()
        },
        "Great"
      ),
    ])
  ]);
}

function backRow(dispatch, className, backSide) {
  return div({ className: "w-60 h60 bg-red-900 inline-block ml-2 text-ellopsis overflow-hidden" }, [
    cell(td, "px-1 py-2", backSide.backSide),
    cell(td, "px-1 py-2 text-right", [
      button(
        {
          className: "hover:bg-black p-2 rounded",
          onclick: () => dispatch(deleteCardMassage(card.id)),
        },
        "Delete"
      ),
    ]),
  ]);
}


function resulteRow(cards) {
  const resulte = R.pipe(
    R.map((card) => card.backSide),
    R.sum
  )(cards);
  return tr({ className: "font-bold text-red-900" }, [cell(td, "", "Result"), cell(td, "", resulte), cell(td, "", "")]);
}

function cardsBody(dispatch, className, cards) {
  const rows = R.map(R.partial(cardRow, [dispatch, "odd:bg-black even:bg-black"]), cards);

  const rowsWithResult = [...rows, resulteRow(cards)];

  return tbody({ className }, rowsWithResult);
}

function tableView(dispatch, cards) {
  if (cards.length === 0) {
    return div({ className: "pt-8 text-center" }, "No Flashcards yet! ");
  }
  return div({className: "" }, [
    tableHeader,
    cardsBody(dispatch, "", cards)
  ]);
}

function fieldSet(labelText, inputValue, placeholder, oninput) {
  return div({ className: "grow flex flex-col" }, [
    label({ className: "text-gray-700 text-sm font-bold mb-2" }, labelText),
    input({
      className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700",
      placeholder,
      type: "text",
      value: inputValue,
      oninput,
    }),
  ]);
}

function buttonSet(dispatch) {
  return div({ className: "flex gap-4 justify-end" }, [
    button(
      {
        className: `${buttonStyle} bg-green-500 hover:bg-black`,
        type: "submit",
      },
      "Save"
    ),
    button(
      {
        className: `${buttonStyle} bg-red-500 hover:bg-black`,
        type: "button",
        onclick: () => dispatch(showCardMassage(false)),
      },
      "Cancel"
    ),
  ]);
}

function formView(dispatch, model) {
  const { description, backSide, showCard } = model;
  if (showCard) {
    return form(
      {
        className: "flex flex-col gap-4",
        onsubmit: (e) => {
          e.preventDefault();
          dispatch(saveFrontSideMassage);
        },
      },
      [
        div({ className: "flex gap-4 " }, [
          fieldSet("Frontsidecard", description, "Enter Frontcard text...", (e) => dispatch(FrontSideInputMassage(e.target.value))),
          fieldSet("backsidecard", backSide || "", "Enter backSidecard text...", (e) => dispatch(backSideInputMassage(e.target.value))),
        ]),
        buttonSet(dispatch),
      ]
    );
  }
  return button(
    {
      className: `${buttonStyle} max-w-xs`,
      onclick: () => dispatch(showCardMassage(true)),
    },
    "New flashcard"
  );
}

function view(dispatch, model) {
  return div({ className: "flex flex-col" }, [formView(dispatch, model), tableView(dispatch, model.cards)]);
}

export default view;