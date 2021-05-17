import showdown from 'showdown';
import manualIntegration from './_manualIntegration.md';
import dynamicIntegration from './_dynamicIntegration.md';
import about from './_about.md';

showdown.setFlavor('github');
const converter = new showdown.Converter();

export default {
    title: '1.Intro/About'
}

export const Overview = () => `<div class="markdown-body">${converter.makeHtml(about)}</div>`;

export const DynamicIntegration = () => `<div class="markdown-body">${converter.makeHtml(dynamicIntegration)}</div>`;

// export const ManualIntegration = () => `<div class="markdown-body">${converter.makeHtml(manualIntegration)}</div>`;

