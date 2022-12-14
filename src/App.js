import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

function app(initModel, update, view, node) {
    let model = initModel;
    let currentView = view(dispatch, model);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);
    function dispatch(massage){
        model = update(massage, model);
        const updateView = view(dispatch, model);
        const patches = diff(currentView, updateView);
        rootNode = patch(rootNode, patches);
        currentView = updateView;
    }
}

export default app;


