import * as R from 'ramda';

const massages = {
    SHOW_CARD: 'SHOW_CARD',
    FRONTSIDE_INPUT: 'FRONTSIDE_INPUT',
    BACKSIDE_INPUT: 'BACKSIDE_INPUT',
    FRONTSIDE_SAVE: 'FRONTSIDE_SAVE',
    BACKSIDE_SAVE: 'BACKSIDE_SAVE',
    UPDATE_CARD: 'UPDATE_CARD',
    DELETE_CARD: 'DELETE_CARD'
};

export function showCardMassage(showCard) {
    return{
        type: massages.SHOW_CARD,
        showCard,
    };
}

export function FrontSideInputMassage(description) {
    return{
        type: massages.FRONTSIDE_INPUT,
        description
    };
}

export function backSideInputMassage(backSide) {
    return{
        type: massages.BACKSIDE_INPUT,
        backSide
    };
}

export const saveFrontSideMassage = { type: massages.FRONTSIDE_SAVE };
export const saveBackSideMassage = { type: massages.BACKSIDE_SAVE };

export function  deletCardMassage(id) {
    return {
        type: massages.DELETE_CARD,
        id
    };
}

function update(massage, model) {
    switch (massage.type) {
        case massages.SHOW_CARD: {
            const { showCard } = massage;
            return { ...model, showCard, description: '' };
        }
        case massages.FRONTSIDE_INPUT: {
            const { description } = massage;
            return { ...model, description };
        }
        case massages.BACKSIDE_INPUT: {
            const { backSide } = massage;
            return { ...model, backSide };
        }
        case massages.FRONTSIDE_SAVE: {
            const { updateModel } = add(massage, model);
            return updateModel;
        }
        case massages.BACKSIDE_SAVE: {
            const { updateModel } = add(massage, model);
            return updateModel;
        }
        case massages.DELETE_CARD: {
            const { id } = massage;
            const cards = R.filter( card => card.id !== id, model.cards); 
            return { ...model, cards };
        }
        case massages.UPDATE_CARD: {
            const { description } = massage;
            return { ...model, description };
        }
    }
    return model;
}

function add(massage, model) {
    const { nextId, description, backSide } = model;
    const card = { id: nextId, description, backSide };
    const cards = [ ...model.cards, card ]
    return {
        ...model,
        cards,
        nextId: nextId + 1,
        description: '',
        backSide: '',
        showCard: false
    };
}

export default update;

