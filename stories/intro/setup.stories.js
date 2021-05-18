import showdown from 'showdown';
import _introMD from "./setup/_intro.md"
import _selectionMD from "./setup/_selection.md"
import _loaderMD from "./setup/_loader.md"
import _confirmationMD from "./setup/_confirmation.md"
import _afterSalesMD from "./setup/_afterSales.md"
import _wrapUpMD from "./setup/_wrapUp.md"

const converter = new showdown.Converter({tables: true});
showdown.setFlavor('github');


export default {
    title: '1.Intro/Setup'
}

export const Intro = () => `<div class="markdown-body">${converter.makeHtml(_introMD)}</div>`;
export const Loader = () => `<div class="markdown-body">${converter.makeHtml(_loaderMD)}</div>`;
export const Selection = () => `<div class="markdown-body">${converter.makeHtml(_selectionMD)}</div>`;
export const Confirmation = () => `<div class="markdown-body">${converter.makeHtml(_confirmationMD)}</div>`;
export const AfterSales = () => `<div class="markdown-body">${converter.makeHtml(_afterSalesMD)}</div>`;
export const WrapUp = () => `<div class="markdown-body">${converter.makeHtml(_wrapUpMD)}</div>`;

Selection.storyName = "Component: Selection";
Confirmation.storyName = "Component: Confirmation";
AfterSales.storyName = "Component: After-Sales";
