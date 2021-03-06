"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPage = exports.buildPage = void 0;
const { writeFile } = require("fs").promises;
const path_1 = require("path");
const cli_block_1 = require("cli-block");
const language_1 = require("../libs/language");
const files_1 = require("./files");
const helpers_1 = require("./helpers");
const style_1 = require("./style");
const kleur_1 = __importDefault(require("kleur"));
const simplifyUrl = (url) => url.replace("/index.html", "");
const isActiveMenu = (link, current) => simplifyUrl(link) == simplifyUrl(current);
const isActiveMenuParent = (link, current) => simplifyUrl(current).includes(simplifyUrl(link)) &&
    simplifyUrl(current) !== "" &&
    simplifyUrl(link) !== "";
const buildPage = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const currentLink = files_1.makePath(file);
    const currentLanguage = file.language;
    /*
     * Generate the html for this page
     */
    const data = {
        menu: payload.menu
            ? payload.menu
                .map((item) => (Object.assign(Object.assign({}, item), { current: isActiveMenu(item.link, currentLink), isParent: isActiveMenuParent(item.link, currentLink) })))
                .filter((item) => item.language == currentLanguage)
            : [],
        style: Object.assign(Object.assign({}, payload.style), { page: currentLink.replace(".html", ".css") }),
        project: payload.project,
        media: payload.media,
        tags: payload.tags
            ? payload.tags.filter((tag) => tag.parent == file.parent)
            : [],
        meta: file.meta,
        contentOnly: false,
        showContentImage: ((_a = file.meta) === null || _a === void 0 ? void 0 : _a.image) && file.meta.type !== "photo",
        favicon: payload.favicon,
        homeLink: file.language == language_1.defaultLanguage ? "/" : `/${file.language}`,
        langMenu: language_1.getLanguageMenu(payload, file),
        language: currentLanguage,
    };
    const html = yield files_1.buildHtml(file, data);
    /*
     * Generate the custom CSS for this page
     */
    const customCssFilePath = path_1.join(payload.settings.output, currentLink).replace(".html", ".css");
    const customHtml = yield files_1.buildHtml(file, Object.assign(Object.assign({}, data), { contentOnly: true }), "template/content.pug");
    const customCss = yield style_1.createCss(customHtml, payload.style.og);
    /*
     * Return the page
     */
    return {
        dir: path_1.join(payload.settings.output, currentLink.split("/").slice(0, -1).join("/")),
        css: {
            data: customCss,
            file: customCssFilePath,
        },
        html: {
            data: html,
            file: path_1.join(payload.settings.output, currentLink),
        },
        name: file.name,
        link: currentLink,
    };
});
exports.buildPage = buildPage;
const createPage = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const page = yield exports.buildPage(payload, file);
    yield helpers_1.createDir(page.dir);
    try {
        yield writeFile(page.html.file, page.html.data);
        yield writeFile(page.css.file, page.css.data);
        cli_block_1.blockLineSuccess(`${page.name}`);
        cli_block_1.blockLine(kleur_1.default.blue(`   ${page.link.replace("/index.html", "")}`));
    }
    catch (err) {
        throw Error(err);
    }
});
exports.createPage = createPage;
//# sourceMappingURL=page.js.map