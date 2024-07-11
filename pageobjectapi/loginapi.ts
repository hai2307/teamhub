
// import { test, expect, APIRequestContext , type Locator, type Page } from '@playwright/test';
// export class postapi {
//     readonly page: Page;
//     readonly reqContext: Locator;
//     readonly examplePost: Locator;
//     readonly exampleResponse: Locator;
//     readonly errorBlankName: Locator;
//     readonly logo: Locator;
//     readonly close_tb: Locator;
//     readonly sidebar: Locator;

//     constructor(page: Page) {
//         this.page = page;
//         // this.userser = page.locator('#username');
//         // this.password = page.locator('#password');
//         // this.button = page.locator('#kc-login');
//         // this.title = page.locator('#kc-page-title');
//         this.logo = page.locator('[class="logo-wrapper"]');
//         this.close_tb = page.locator('#notification_1 div').filter({ hasText: 'Thông báoĐăng nhập thành công' }).getByRole('img')
//         this.sidebar=page.locator('.sidebar-minimizer')
//      }

// // Start send request
//     async function sendRequest(req) {
//     return new Promise((resolve, reject) => {
//         pm.sendRequest(req, (err, res) => {
//             if (err) {
//                 return reject(err);
//             }
//             return resolve(res);
//         })
//     });
// }

// // Build request login
//     async function requestLogin() {
//     const generateJWTPostRequest = {
//         // url: `${pm.environment.get('baseUrl')}/auth/get-token`,
//         url: `{baseURL}`,
//         method: 'POST',
//         header: {
//             'Content-Type': 'application/json'
//         },
//         body: {
//             mode: 'raw',
//             raw: JSON.stringify({ email: "han.tran+ta@tokyotechies.com", password: "TT_test1" })
//         }
//     };
//     const response = await sendRequest(generateJWTPostRequest);
//  //  Access token / idToken
//     const accessToken = response.json().data['accessToken'];
//     const idToken = response.json().data['idToken'];
//     pm.environment.set("accessToken", accessToken);
//     pm.environment.set("idToken",idToken);    
//   return accessToken;
// }

// // Clear cookies
// async function clearCookies() {
//     const jar = pm.cookies.jar();
//     if (jar) jar.clear(pm.request.url, function (error) {
//         // error - <Error>
//         throw (error);
//     });
// }

// // Re-login function
// const countTestCaseReLogin = 10;
// const checkTestCaseIndex = globals.testCaseIndex << 0;
// if (checkTestCaseIndex) {
//     if ((checkTestCaseIndex % countTestCaseReLogin) === 0) {
//         requestLogin();
//         // clearCookies();
//     }
//     return;
// }

// const _dummy = setInterval(() => { }, 300000);
// // Main function
// (async function main() {
//     // Start authentication
//     await requestLogin();
//     // await clearCookies();
//     const randExpUrl = 'https://github.com/fent/randexp.js/releases/download/v0.4.3/randexp.min.js';

//     // Set rand-exp text
//     const resultRandexp = await sendRequest(randExpUrl);
//     const randexp = resultRandexp.text();
//     pm.globals.set("randexp", randexp);
//     /*
//     --------- START LOAD UTILS ----------
//     */
//     pm.globals.set('loadUtils', function loadUtils() {
//         const IN_VALID = 'invalid';
//         const responseCode = {
//             OK: 200,
//         };
//         const dateFormatTypes = [
//             'YYYY-MM-DD HH:mm:ss',
//             'YYYY/MM/DD HH:mm:ss',
//             'YYYY-MM-DD',
//             'YYYY/MM/DD',
//             'MM/DD/YY',
//             'MM-DD-YY',
//             'HH:mm:ss',
//             'HH:mm',
//             'X',
//             'YYYY-MM-DDTHH:mm:ss.SSSZ',
//             'YYYY/MM/DDTHH:mm:ss.SSSZ',
//         ];
//         const TYPE = {
//             EMAIL: 'EMAIL',
//             STRING: 'STRING',
//             STRING_KATAKANA: 'STRING_KATAKANA',
//             DATE: 'DATE',
//             BOOLEAN: 'BOOLEAN',
//             NUMBER: 'NUMBER',
//             ID: 'ID',
//             PASSWORD: 'PASSWORD',
//             ID_STRING: 'ID_STRING',
//             ARRAY_OBJECT: 'ARRAY_OBJECT',
//             ARRAY_STRING: 'ARRAY_STRING',
//             ARRAY_DATE: 'ARRAY_DATE',
//             ARRAY_NUMBER: 'ARRAY_NUMBER',
//             ARRAY_ID: 'ARRAY_ID',
//             PAGE: 'PAGE',
//             OBJECT: 'OBJECT',
//             LIMIT: 'LIMIT',
//         }

//         const arrayType = [TYPE.ARRAY_DATE, TYPE.ARRAY_ID, TYPE.ARRAY_NUMBER, TYPE.ARRAY_STRING, TYPE.ARRAY_OBJECT];
//         const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
//         const MIN_VALUE = {
//             ID: 1,
//             NUMBER: -9223372036854775808,
//             STRING: 1,
//             DATE: new Date('1970-01-01 00:00:00').getTime(),
//             PAGE: 1,
//             LIMIT: 10,
//             TEXT: 1,
//             DECIMAL: 0,
//         };
//         const GREATER = 'greater';
//         const MAX_VALUE = {
//             // Add safe number 2^53
//             ID: 1,
//             NUMBER: 9223372036854775807,
//             STRING: 255,
//             DATE: new Date('9999-12-31 23:59:59').getTime(),
//             PAGE: 10000,
//             LIMIT: 10000,
//             TEXT: 65535,
//             DECIMAL: 20,
//         };
//         const EMAIL_VALUE = {
//             PREFIX: 'ttl.test.',
//             DOMAIN: 'tokyotechlab.com',
//         };

//         const moment = require('moment');

//         let utils = {};
//         let window = {};
//         let objectAttribute = {};
//         let keyParentGlobal = '';
//         let keyActive = '';

//         const generateRandomString = (characters, length) => {
//             let result = '';
//             const charactersLength = characters.length;
//             for (let i = 0; i < length; i += 1) {
//                 result += characters.charAt(Math.floor(Math.random() * charactersLength));
//             }
//             return result;
//         }
//         /*
//     --------- START RANDOM TEST DATA FUNCTION----------
//     */
//         // Auto gen number
//         utils.randomNumber = (min = MIN_VALUE.NUMBER || MIN_VALUE.DECIMAL, max = MAX_VALUE.NUMBER || MAX_VALUE.DECIMAL, decimals = 0, positive = false) => {
//             let randomValue = (Math.random() * (max - min) + min);
//             if (decimals) {
//                 if (Number.isInteger(randomValue)) {
//                     randomValue = `${randomValue}.`
//                     for (let i = 0; i < decimals; i += 1) {
//                         randomValue += '0';
//                     }
//                     return Number(randomValue);
//                 }
//                 return Number(randomValue.toFixed(decimals));
//             }
//             return positive ? Math.abs(Math.ceil(randomValue)) : Math.ceil(randomValue);
//         };

//         // Auto gen special characters
//         utils.randomSpecifiedChar = (length = 5) => {
//             return generateRandomString('~!@#$%^&*()-_+=":;?/>.<]{[}|', length);
//         };

//         // Auto generate string
//         utils.randomString = (length = 500) => {
//             return generateRandomString('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', length);
//         };

//         utils.randomObject = (schema, testCaseIndex) => {
//             const result = {};
//             schema.forEach((ele, index) => {
//                 let value = null;
//                 const enumValue = ele.testDataValue?.enumValue || [];
//                 const regexValue = ele.testDataValue?.regexValue || '';
//                 const dateFormats = ele.testDataValue?.dateFormats;
//                 const minLen = ele.testDataValue?.minLengthArray || 1;
//                 const isLengthRequired = ele.testDataValue?.isLengthRequired || false;
//                 if (regexValue !== '') {
//                     value = new window.RandExp(regexValue).gen();
//                 }
//                 else if (enumValue.length > 0) {
//                     if (arrayType.indexOf(ele.type) > -1) {
//                         value = Array.from({ length: minLen }, () => enumValue[Math.floor(index % enumValue.length)]);
//                     }
//                     else value = enumValue[Math.floor(index % enumValue.length)];
//                 }
//                 else switch (ele.type) {
//                     case TYPE.EMAIL:
//                         value = `${EMAIL_VALUE.PREFIX}${utils.randomString(10)}@${EMAIL_VALUE.DOMAIN}`;
//                         break;
//                     case TYPE.ID:
//                         value = utils.randomNumber(ele.testDataValue.min || MIN_VALUE.DECIMAL, ele.testDataValue.max || 10000, 0, true);
//                         break;
//                     case TYPE.NUMBER:
//                         value = testCaseIndex + 1 ? testCaseIndex : utils.randomNumber(ele.testDataValue.min || -10000, ele.testDataValue.max || 10000, 0, true);
//                         break;
//                     case TYPE.DATE:
//                         value = moment(utils.randomDate(ele.testDataValue.min || MIN_VALUE.DATE, ele.testDataValue.max || MAX_VALUE.DATE)).format(dateFormats[0] || DATE_TIME_FORMAT);
//                         break;
//                     case TYPE.STRING:
//                         value = utils.randomString(Math.floor(Math.random() * index + 1));
//                         break;
//                     case TYPE.ARRAY_OBJECT:
//                         value = isLengthRequired ? [] : Array.from({ length: minLen }, (e, index) => utils.randomObject(ele.schema, index));
//                         break;
//                     default:
//                         value = null;
//                 }
//                 result[ele.key] = value;
//             })
//             return result;
//         }

//         // Auto generate katakana string
//         utils.randomStringKatakana = (length = 500) => {
//             return generateRandomString('ァアィイゥウェエォオカヵガキギクヶグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワ１２３４５６７８９０', length);
//         };

//         // Auto generate email
//         utils.randomEmail = (prefix = EMAIL_VALUE.PREFIX, domain = EMAIL_VALUE.DOMAIN) => {
//             return `${prefix}${utils.randomString(utils.randomNumber(1, 20))}@${domain}`;
//         };

//         // Auto generate date
//         utils.randomDate = (start = MIN_VALUE.DATE, end = MAX_VALUE.DATE) => {
//             return new Date(start + Math.random() * (end - start));
//         };

//         // Auto generate id string
//         utils.randomIdString = (length = 24) => {
//             return generateRandomString('ABCDEFabcdef0123456789', length);
//         };

//         // Generate combinations of elements in a single array
//         // utils.getCombinations = (valuesArray = []) => {
//         //     var combination = [];
//         //     var temp = [];
//         //     var specialLength = Math.pow(2, valuesArray.length);

//         //     for (var i = 0; i < specialLength; i++) {
//         //         temp = [];
//         //         for (var j = 0; j < valuesArray.length; j++) {
//         //             if ((i & Math.pow(2, j))) {
//         //                 temp.push(valuesArray[j]);
//         //             }
//         //         }
//         //         if (temp.length > 0) {
//         //             combination.push(temp);
//         //         }
//         //     }
//         //     combination.sort((a, b) => a.length - b.length);
//         //     return combination;
//         // };
//         // End to generate test data

//         // Get number of string
//         utils.getNumberOfString = (txt = '') => {
//             let numb = txt.match(/\d/g);
//             numb = numb.join("");
//             return numb;
//         };

//         // Get body request
//         utils.getBodyRequest = () => {
//             return {
//                 mode: 'raw',
//                 options: {
//                     raw: {
//                         language: 'json'
//                     }
//                 }
//             };
//         };

//         // Set query request - GET
//         utils.setQueryRequest = (queryAttributeTitles, testCaseData = {}) => {
//             queryAttributeTitles.forEach(attributeTitle => {
//                 if (typeof testCaseData[attributeTitle] !== 'undefined') {
//                     let inputData = testCaseData[attributeTitle];
//                     if (!Array.isArray(inputData)) {
//                         pm.request.url.query.add({ key: attributeTitle, value: `${inputData}` });
//                     } else {
//                         inputData.forEach(data => {
//                             pm.request.url.query.add({ key: `${attributeTitle}[]`, value: `${data}` });
//                         });
//                     }
//                 }
//             });
//         };

//         // Set param request - DELETE
//         utils.setParamRequest = (paramAttributeTitles = [], testCaseData = {}) => {
//             paramAttributeTitles.forEach(attributeTitle => {
//                 pm.globals.set(attributeTitle, testCaseData[attributeTitle]);
//             });
//         };

//         // Set body request - POST/PATCH
//         utils.setBodyRequest = (bodyAttributeTitles = [], testCaseData = {}) => {
//             let body = utils.getBodyRequest();
//             const bodyData = {};
//             (bodyAttributeTitles || []).forEach(attributeTitle => {
//                 if (typeof testCaseData[attributeTitle] !== 'undefined') {
//                     bodyData[attributeTitle] = testCaseData[attributeTitle];
//                 }
//             });
//             pm.globals.set("bodyData", bodyData);
//             pm.globals.set("bodyAttributes", bodyAttributes);
//             body.raw = JSON.stringify(bodyData);
//             pm.request.body.update(body);
//         };

//         // Format data body request
//         utils.formatDataRequest = (bodyAttributes) => {
//             const bodyData = {};
//             bodyAttributes.forEach(attributeName => {
//                 let attributeValue = pm.iterationData.get(attributeName);
//                 if (attributeValue !== "") {
//                     if (attributeValue === '_NULL') {
//                         attributeValue = null;
//                     } else if (attributeValue === '_FALSE') {
//                         attributeValue = false;
//                     } else if (attributeValue === '_TRUE') {
//                         attributeValue = true;
//                     } else if (attributeValue && typeof attributeValue === 'string') {
//                         let attributeValueTemp = attributeValue;
//                         try {
//                             attributeValue = JSON.parse(attributeValue);
//                         } catch {
//                             attributeValue = attributeValueTemp;
//                         }
//                     }
//                     if (attributeValue === '_EMPTY') {
//                         attributeValue = "";
//                     }
//                     if (attributeValue === '_MAX_INT') {
//                         attributeValue = 21474836491;
//                     }
//                     if (typeof attributeValue === 'string' && attributeValue.includes('_RANDOM_STRING')) {
//                         let charactersLength = +utils.getNumberOfString(attributeValue);
//                         attributeValue = utils.randomString(charactersLength);
//                     }
//                     if (typeof attributeValue === 'string' && attributeValue.includes('_STRING_NUMBER')) {
//                         let valueNumber = utils.getNumberOfString(attributeValue);
//                         attributeValue = `${valueNumber}`;
//                     }
//                     bodyData[attributeName] = attributeValue;
//                 }
//             });
//             let otherAttributeValue = pm.iterationData.get('otherAttribute');
//             if (otherAttributeValue !== undefined) {
//                 bodyData['otherAttribute'] = otherAttributeValue;
//             }
//             if (!bodyData['otherAttribute']) {
//                 delete bodyData['otherAttribute'];
//             }
//             return bodyData;
//         };

//         // Format data value
//         utils.formatDataValue = (attributeData = {}, oldValue = '') => {
//             const { testDataValue } = attributeData;
//             const randomData = testDataValue ? testDataValue.randomData : {};
//             if (!randomData) {
//                 return oldValue;
//             }
//             if (oldValue != testDataValue.defaultValue) {
//                 return oldValue;
//             }
//             if (randomData.enumValue && typeof Array.isArray(randomData.enumValue) && randomData.enumValue.length) {
//                 let randomValue = _.sample(randomData.enumValue, utils.randomNumber(1, randomData.maxLength || 1)) || [];
//                 if (!randomData.type || !randomData.type.includes('ARRAY')) {
//                     randomValue = randomValue.join();
//                 }
//                 return randomValue;
//             }
//             if (randomData.regexValue && typeof randomData.regexValue === 'string') {
//                 let randomRegex = new window.RandExp(randomData.regexValue).gen();
//                 return randomRegex;
//             }
//             if (randomData.type === TYPE.EMAIL) {
//                 return utils.randomEmail(randomData.prefix || '', randomData.domain || 'ttl.com');
//             }
//             if (randomData.type === TYPE.STRING_KATAKANA) {
//                 return utils.randomStringKatakana(utils.randomNumber(randomData.min || 1, randomData.max || 255))
//             }
//             if (randomData.type === TYPE.STRING) {
//                 return utils.randomString(utils.randomNumber(randomData.min || 1, randomData.max || 255))
//             }
//             if (randomData.type === TYPE.NUMBER) {
//                 return utils.randomNumber(randomData.min || 1, randomData.max || 12, randomData.decimals || 0);
//             }
//             if (randomData.type === TYPE.ID_STRING) {
//                 return utils.randomIdString(randomData.min || 1, randomData.max || 24)
//             }
//             if (randomData.type === TYPE.DATE) {
//                 const randomValue = utils.randomDate(randomData.min || MIN_VALUE.DATE, randomData.max || MAX_VALUE.DATE);
//                 let dateFormat = DATE_TIME_FORMAT;
//                 if (Array.isArray(randomData.dateFormats) && randomData.dateFormats.length) {
//                     dateFormat = _.sample(randomData.dateFormats);
//                 }
//                 return moment(randomValue).format(dateFormat[0]);
//             }
//             return oldValue;
//         };

//         // Random data for some attribute of each test case when generate test case
//         utils.changeDataValue = (dataTestCase = {}, keyParent = '') => {
//             for (const key in dataTestCase) {
//                 let valueAttribute = dataTestCase[key];
//                 let keyAttribute = keyParent ? `${keyParent}.${key}` : key;
//                 if (valueAttribute) {
//                     if (Array.isArray(valueAttribute)) {
//                         dataTestCase[key].forEach((valueAttributeChild, index) => {
//                             utils.changeDataValue(dataTestCase[key][index], keyAttribute);
//                         });
//                     }
//                     if (typeof valueAttribute === 'object') {
//                         utils.changeDataValue(dataTestCase[key], keyAttribute);
//                     }
//                     if (objectAttribute[keyAttribute] && keyActive !== keyAttribute) {
//                         dataTestCase[key] = utils.formatDataValue(objectAttribute[keyAttribute], valueAttribute);
//                     }
//                 }
//             }
//         };
//         /*
//         --------- END RANDOM TEST DATA FUNCTION ----------
//         */

//         /*
//         --------- START GENERATE TEST CASE FUNCTION ----------
//         */
//         // Generate test case that type is ID_STRING
//         utils.addTestCaseTypeIdString = (attributeData, testCases, lastRowData, messageKey = '') => {
//             let rowData = JSON.parse(JSON.stringify(lastRowData));
//             const { key, testDataValue = {
//                 defaultValue: '',
//                 enumValue: [],
//                 regexValue: '',
//                 randomData: {},
//             } } = attributeData;
//             messageKey = messageKey ? messageKey : key;
//             const regexValue = testDataValue.regexValue;
//             const enumValue = testDataValue.enumValue;
//             if (regexValue && typeof regexValue === 'string') {
//                 let randomRegex1 = new window.RandExp(regexValue).gen();
//                 let randomRegex2 = new window.RandExp(regexValue).gen();
//                 let randomRegex3 = new window.RandExp(regexValue).gen();
//                 // Regex1
//                 utils.addTestCase(testCases, {
//                     ...rowData,
//                     _TEST_CASE: `${messageKey} value random regex 1 = ${randomRegex1}`,
//                     _STATUS_CODE: [responseCode.OK],
//                     [key]: randomRegex1,
//                 });
//                 // Regex2
//                 utils.addTestCase(testCases, {
//                     ...rowData,
//                     _TEST_CASE: `${messageKey} value random regex 2 = ${randomRegex2}`,
//                     _STATUS_CODE: [responseCode.OK],
//                     [key]: randomRegex2,
//                 });
//                 // Regex3
//                 utils.addTestCase(testCases, {
//                     ...rowData,
//                     _TEST_CASE: `${messageKey} value random regex 3 = ${randomRegex3}`,
//                     _STATUS_CODE: [responseCode.OK],
//                     [key]: randomRegex3,
//                 });
//             }
//             // Random
//             utils.addTestCase(testCases, {
//                 ...rowData,
//                 _TEST_CASE: `${messageKey} value length = ${24}`,
//                 _STATUS_CODE: [responseCode.OK],
//                 [key]: utils.randomIdString(24),
//             });
//             // Enum value
//             if (Array.isArray(enumValue) && enumValue.length > 0) {
//                 utils.addTestCase(testCases, {
//                     ...rowData,
//                     _TEST_CASE: `${messageKey} value != enum`,
//                     _STATUS_CODE: [responseCode.OK],
//                     [key]: utils.randomIdString(24),
//                 });
//             }
//         };

//         // Generate test case that type is ID
//         utils.addTestCaseTypeId = (attributeData, testCases, lastRowData, messageKey = '') => {
//             let rowData = JSON.parse(JSON.stringify(lastRowData));
//             const { key, testDataValue = {
//                 defaultValue: '',
//                 min: 0,
//                 max: 255,
//                 regexValue: '',
//                 enumValue: [],
//                 randomData: {},
//             } } = attributeData;
//             messageKey = messageKey ? messageKey : key;
//             let min = testDataValue.min || MIN_VALUE.ID;
//             let max = testDataValue.max || MAX_VALUE.ID;
//             let avg = Math.floor((min + max) / 2);
//             utils.addTestCase(testCases, {
//                 ...rowData,
//                 _TEST_CASE: `${messageKey} min value = ${min}`,
//                 _STATUS_CODE: [responseCode.OK],
//                 [key]: min,
//             });
//             utils.addTestCase(testCases, {
//                 ...rowData,
//                 _TEST_CASE: `${messageKey} max value = ${max}`,
//                 _STATUS_CODE: [responseCode.OK],
//                 [key]: max,
//             });
//             utils.addTestCase(testCases, {
//                 ...rowData,
//                 _TEST_CASE: `${messageKey} value length = ${avg}`,
//                 _STATUS_CODE: [responseCode.OK],
//                 [key]: avg,
//             });
//         };
//         // Generate test case that type is STRING
//         utils.addTestCaseTypeString = (attributeData, testCases, lastRowData, messageKey = '') => {
//             let rowData = JSON.parse(JSON.stringify(lastRowData));
//             const { key, testDataValue = {
//                 defaultValue: '',
//                 min: 0,
//                 max: 255,
//                 regexValue: '',
//                 enumValue: [],
//                 randomData: {},
//             } } = attributeData;
//             messageKey = messageKey ? messageKey : key;
//             let min = testDataValue.min || MIN_VALUE.STRING;
//             let max = testDataValue.max || MAX_VALUE.STRING;
//             let avg = Math.floor((min + max) / 2);
//             const enumValue = testDataValue.enumValue;
//             const regexValue = testDataValue.regexValue;
//             const randomData = testDataValue.randomData;
//             const inputJP = testDataValue.inputJP === true;
//             if (!Array.isArray(enumValue) || !enumValue.length) {
//                 if (regexValue && typeof regexValue === 'string') {
//                     let randomRegex1 = new window.RandExp(regexValue).gen();
//                     let randomRegex2 = new window.RandExp(regexValue).gen();
//                     let randomRegex3 = new window.RandExp(regexValue).gen();
//                     // Regex1
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value random regex 1 = ${randomRegex1}`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: randomRegex1,
//                     });
//                     // Regex2
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value random regex 2 = ${randomRegex2}`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: randomRegex2,
//                     });
//                     // Regex3
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value random regex 3 = ${randomRegex3}`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: randomRegex3,
//                     });
//                 } else {
//                     // length = min
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value length = ${min}`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: inputJP ? utils.randomStringKatakana(min) : utils.randomString(min),
//                     });
//                     // length = max
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value length = ${max}`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: inputJP ? utils.randomStringKatakana(max) : utils.randomString(max),
//                     });
//                     // length = avg
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value length = ${avg}`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: inputJP ? utils.randomStringKatakana(avg) : utils.randomString(avg),
//                     });
//                 }
//             }
//             if (Array.isArray(enumValue) && enumValue.length > 0) {
//                 enumValue.forEach(dataValue => {
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value = ${dataValue}`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: dataValue
//                     });
//                 });
//             }
//         };

//         // Generate test case that type = NUMBER
//         utils.addTestCaseTypeNumber = (attributeData, testCases, lastRowData, messageKey = '') => {
//             let rowData = JSON.parse(JSON.stringify(lastRowData));
//             const { key, type, testDataValue = {
//                 defaultValue: '',
//                 min: 0,
//                 max: 255,
//                 regexValue: '',
//                 enumValue: [],
//                 randomData: {},
//                 minDecimal: '',
//                 maxDecimal: '',
//             } } = attributeData;
//             messageKey = messageKey ? messageKey : key;
//             const enumValue = testDataValue.enumValue;
//             const regexValue = testDataValue.regexValue;
//             const randomData = testDataValue.randomData;
//             let min = testDataValue.min;
//             let max = testDataValue.max;

//             if (!min && !max) {
//                 if (type === TYPE.NUMBER) {
//                     min = MIN_VALUE.NUMBER;
//                     max = MAX_VALUE.NUMBER;
//                 }
//                 if (type === TYPE.ID || type === TYPE.ARRAY_ID) {
//                     min = MIN_VALUE.ID;
//                     max = MAX_VALUE.ID;
//                 }
//                 if (type === TYPE.LIMIT) {
//                     min = MIN_VALUE.LIMIT;
//                     max = MAX_VALUE.LIMIT;
//                 }
//                 if (type === TYPE.PAGE) {
//                     min = MIN_VALUE.PAGE;
//                     max = MAX_VALUE.PAGE;
//                 }
//                 if (typeof testDataValue.min === 'number') {
//                     min = testDataValue.minDecimal;
//                 }
//                 if (typeof testDataValue.max === 'number') {
//                     max = testDataValue.maxDecimal;
//                 }
//             }
//             let avg = Math.floor((min + max) / 2);
//             if (!Array.isArray(enumValue) || !enumValue.length) {
//                 utils.addTestCase(testCases, {
//                     ...rowData,
//                     _TEST_CASE: `${messageKey} value  = ${min}`,
//                     _STATUS_CODE: [responseCode.OK],
//                     [key]: utils.randomNumber(min, min, testDataValue.minDecimal)
//                 });
//                 utils.addTestCase(testCases, {
//                     ...rowData,
//                     _TEST_CASE: `${messageKey} value = ${max}`,
//                     _STATUS_CODE: [responseCode.OK],
//                     [key]: utils.randomNumber(max, max, testDataValue.maxDecimal)
//                 });
//                 utils.addTestCase(testCases, {
//                     ...rowData,
//                     _TEST_CASE: `${messageKey} value = ${avg}`,
//                     _STATUS_CODE: [responseCode.OK],
//                     [key]: utils.randomNumber(avg, avg, Math.floor((testDataValue.minDecimal + testDataValue.maxDecimal) / 2))
//                 });
//                 utils.addTestCase(testCases, {
//                     ...rowData,
//                     _TEST_CASE: `${messageKey} value = random from ${min} to ${max} `,
//                     _STATUS_CODE: [responseCode.OK],
//                     [key]: utils.randomNumber(min, max, testDataValue.maxDecimal)
//                 });
//             }
//             enumValue.forEach(dataValue => {
//                 utils.addTestCase(testCases, {
//                     ...rowData,
//                     _TEST_CASE: `${messageKey} value = ${dataValue}`,
//                     _STATUS_CODE: [responseCode.OK],
//                     [key]: dataValue
//                 });
//             });
//             // Enum value
//             if (Array.isArray(enumValue) && enumValue.length > 0) {
//                 enumValue.forEach(value => {
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value != enum`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: value,
//                     });
//                 })

//             }
//             // Regex value
//             if (regexValue) {
//                 let regexStr = new window.RandExp(regexValue).gen();
//                 utils.addTestCase(testCases, {
//                     ...rowData,
//                     _TEST_CASE: `${messageKey} value = regex`,
//                     _STATUS_CODE: [responseCode.OK],
//                     [key]: regexStr,
//                 });
//             }
//         };

//         // Generate test case that type = BOOLEAN
//         utils.addTestCaseTypeBoolean = (attributeData, testCases, lastRowData, messageKey = '') => {
//             let rowData = JSON.parse(JSON.stringify(lastRowData));
//             const { key, testDataValue = {
//                 defaultValue: '',
//             } } = attributeData;
//             messageKey = messageKey ? messageKey : key;
//             utils.addTestCase(testCases, {
//                 ...rowData,
//                 _TEST_CASE: `${messageKey} value is default value`,
//                 _STATUS_CODE: [responseCode.OK],
//                 [key]: testDataValue.defaultValue,
//             });
//         };

//         // Generate test case that type = DATE
//         utils.addTestCaseTypeDate = (attributeData, testCases, lastRowData, messageKey = '') => {
//             let rowData = JSON.parse(JSON.stringify(lastRowData));
//             const { key, testDataValue = {
//                 defaultValue: new Date().getTime(),
//                 min: new Date('1900-01-01').getTime(),
//                 max: new Date('2100-12-31').getTime(),
//                 regexValue: '',
//                 enumValue: [],
//                 randomData: {},
//                 dateFormats: [DATE_TIME_FORMAT],
//             } } = attributeData;
//             messageKey = messageKey ? messageKey : key;
//             const regexValue = testDataValue.regexValue;
//             const enumValue = testDataValue.enumValue;
//             const randomData = testDataValue.randomData;
//             let min = testDataValue.min || MIN_VALUE.DATE;
//             let max = testDataValue.max || MAX_VALUE.DATE;
//             let dateFormats = testDataValue.dateFormats || [];
//             if (!Array.isArray(enumValue) || !enumValue.length) {
//                 if (!dateFormats.length) dateFormats.push(DATE_TIME_FORMAT);
//                 dateFormats.forEach(dateFormat => {
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value = min date format = ${dateFormat}`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: moment.utc(min).format(dateFormat),
//                     });
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value = max date format = ${dateFormat}`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: moment.utc(max).format(dateFormat),
//                     });
//                 });
//                 // Min value
//                 if (testDataValue.min) {
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value = min date`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: moment.utc(new Date(min).getTime()).format(dateFormats[0] || DATE_TIME_FORMAT),
//                     });
//                 }
//                 //  Max value
//                 if (testDataValue.max) {
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value = max date`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: moment.utc(new Date(max).getTime()).format(dateFormats[0] || DATE_TIME_FORMAT),
//                     });
//                 }
//             }
//             if (Array.isArray(enumValue) && enumValue.length > 0) {
//                 enumValue.forEach(dataValue => {
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value = ${dataValue}`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: dataValue
//                     });
//                 });
//             }
//         }

//         // Generate test case that type = EMAIL
//         utils.addTestCaseTypeEmail = (attributeData, testCases, lastRowData, messageKey = '') => {
//             let rowData = JSON.parse(JSON.stringify(lastRowData));
//             const { key, testDataValue = {
//                 defaultValue: '',
//                 isRequired: false,
//                 isUnique: false,
//                 uniqueValue: '',
//                 isDeleted: false,
//                 deletedValue: '',
//                 min: 0,
//                 max: 255,
//                 regexValue: '',
//                 enumValue: [],
//                 randomData: {
//                     type: TYPE.EMAIL,
//                     prefix: EMAIL_VALUE.PREFIX,
//                     domain: EMAIL_VALUE.DOMAIN
//                 },
//             } } = attributeData;
//             messageKey = messageKey ? messageKey : key;
//             const regexValue = testDataValue.regexValue;
//             const enumValue = testDataValue.enumValue;
//             let prefix = EMAIL_VALUE.PREFIX;
//             let domain = EMAIL_VALUE.DOMAIN;
//             const min = testDataValue.min;
//             const max = testDataValue.max;
//             if (prefix && domain) utils.addTestCase(testCases, {
//                 ...rowData,
//                 _TEST_CASE: `${messageKey} value = regex`,
//                 _STATUS_CODE: [responseCode.OK],
//                 [key]: `${utils.randomString(10)}@${prefix}.${domain}`,
//             })
//             // Regex value
//             if (regexValue) {
//                 let randomEmail = new window.RandExp(regexValue).gen();
//                 utils.addTestCase(testCases, {
//                     ...rowData,
//                     _TEST_CASE: `${messageKey} value = regex`,
//                     _STATUS_CODE: [responseCode.OK],
//                     [key]: randomEmail,
//                 });
//             } else if (!regexValue) {
//                 const minLength = min - prefix.length - domain.length - 2;
//                 const maxLength = max - prefix.length - domain.length - 2;
//                 const avgLength = Math.ceil((minLength + maxLength) / 2);
//                 utils.addTestCase(testCases, {
//                     ...rowData,
//                     _TEST_CASE: `${messageKey} length = min`,
//                     _STATUS_CODE: [responseCode.OK],
//                     [key]: `${utils.randomString(minLength)}@${prefix}.${domain}`,
//                 });
//                 utils.addTestCase(testCases, {
//                     ...rowData,
//                     _TEST_CASE: `${messageKey} length = max`,
//                     _STATUS_CODE: [responseCode.OK],
//                     [key]: `${utils.randomString(maxLength)}@${prefix}.${domain}`,
//                 });
//                 utils.addTestCase(testCases, {
//                     ...rowData,
//                     _TEST_CASE: `${messageKey} value = regex`,
//                     _STATUS_CODE: [responseCode.OK],
//                     [key]: `${utils.randomString(avgLength)}@${prefix}.${domain}`,
//                 });
//             }
//             // Enum value
//             if (Array.isArray(enumValue) && enumValue.length > 0) {
//                 enumValue.forEach(email => {
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value = enum`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: email,
//                     });
//                 })
//             }
//         };

//         // Generate test case that type = PASSWORD
//         utils.addTestCaseTypePassword = (attributeData, testCases, lastRowData, messageKey = '') => {
//             let rowData = JSON.parse(JSON.stringify(lastRowData));
//             const { key, testDataValue = {
//                 defaultValue: '',
//                 min: 0,
//                 max: 255,
//                 regexValue: '',
//             } } = attributeData;
//             messageKey = messageKey ? messageKey : key;
//             let min = testDataValue.min || MIN_VALUE.STRING;
//             let max = testDataValue.max || MAX_VALUE.STRING;
//             let avg = Math.floor((min + max) / 2);
//             const regexValue = testDataValue.regexValue;
//             const inputJP = testDataValue.inputJP === true;
//             // Invalid alphabet string
//             if (!Array.isArray(enumValue) || !enumValue.length) {
//                 if (regexValue && typeof regexValue === 'string') {
//                     let randomRegex1 = new window.RandExp(regexValue).gen();
//                     let randomRegex2 = new window.RandExp(regexValue).gen();
//                     let randomRegex3 = new window.RandExp(regexValue).gen();
//                     // Regex1
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value random regex 1 = ${randomRegex1}`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: randomRegex1,
//                     });
//                     // Regex2
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value random regex 2 = ${randomRegex2}`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: randomRegex2,
//                     });
//                     // Regex3
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value random regex 3 = ${randomRegex3}`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: randomRegex3,
//                     });
//                 } else {
//                     // length = min
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value length = ${min}`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: inputJP ? utils.randomStringKatakana(min) : utils.randomString(min),
//                     });
//                     // length = max
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value length = ${max}`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: inputJP ? utils.randomStringKatakana(max) : utils.randomString(max),
//                     });
//                     // length = avg
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value length = ${avg}`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: inputJP ? utils.randomStringKatakana(avg) : utils.randomString(avg),
//                     });
//                 }
//             }
//         };

//         // Generate test case that type = OBJECT
//         utils.addTestCaseTypeObject = (attributeData, testCases, lastRowData, messageKey = '', keyParent = '') => {
//             let rowData = JSON.parse(JSON.stringify(lastRowData));
//             const { key, schema, testDataValue = {
//                 defaultValue: {},
//                 enumValue: [],
//                 randomData: {},
//             } } = attributeData;
//             messageKey = messageKey ? messageKey : key;
//             const enumValue = testDataValue.enumValue;
//             let defaultValueTemp = {};
//             // Default value
//             schema.forEach((attributeDataSchema) => {
//                 let tempTestCases = [];
//                 let lastRow = utils.getLastRowData([], [], attributeData.schema);
//                 utils.addTestCases(attributeDataSchema, tempTestCases, lastRow, '', keyParent);
//                 tempTestCases.forEach(testCaseData => {
//                     let tempTestCase = {
//                         ...rowData,
//                         _TEST_CASE: `${key}.${testCaseData['_TEST_CASE']}`,
//                         _STATUS_CODE: testCaseData['_STATUS_CODE'],
//                     };
//                     delete testCaseData['_STATUS_CODE'],
//                         delete testCaseData['_TEST_CASE'],
//                         utils.addTestCase(testCases, {
//                             ...tempTestCase,
//                             [key]: {
//                                 ...defaultValueTemp,
//                                 ...testCaseData,
//                             }
//                         });
//                 });
//                 defaultValueTemp[attributeDataSchema.key] = attributeDataSchema.testDataValue.defaultValue;
//             });
//             if (Array.isArray(enumValue) && enumValue.length > 0) {
//                 enumValue.forEach(dataValue => {
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value = ${dataValue}`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: dataValue
//                     });
//                 });
//             }
//         };

//         // Generate test case that type = ARRAY_NUMBER
//         utils.addTestCaseTypeArrayNumber = (attributeData, testCases, lastRowData, messageKey = '') => {
//             let rowData = JSON.parse(JSON.stringify(lastRowData));
//             const { key, testDataValue = {
//                 defaultValue: [1, 2],
//                 enumValue: [],
//                 isLengthRequired: false,
//                 minLengthArray: 1,
//                 maxLengthArray: 10,
//             } } = attributeData;
//             messageKey = messageKey ? messageKey : key;
//             const enumValue = testDataValue.enumValue;
//             if (Array.isArray(enumValue) && enumValue.length > 0) {
//                 defaultValue.forEach((value, index) => {
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${key} length = min length `,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: value,
//                     });
//                 })
//             }
//             // Check min max elements of array
//             if (testDataValue?.isLengthRequired) {
//                 const minLen = +testDataValue.minLengthArray;
//                 const maxLen = +testDataValue.maxLengthArray;
//                 if (minLen >= 0) {
//                     const minArr = Array.from({ length: minLen }, () => utils.randomNumber(testDataValue.min || MIN_VALUE.DECIMAL, testDataValue.max || 10000));
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${key} length = min length `,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: [...minArr],
//                     });
//                 }
//                 if (maxLen >= 0) {
//                     const maxArr = Array.from({ length: maxLen }, () => utils.randomNumber(testDataValue.min || MIN_VALUE.DECIMAL, testDataValue.max || 10000));
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${key} length = max length `,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: [...maxArr],
//                     });
//                 }
//             }
//         };

//         // Generate test case that type = ARRAY_STRING
//         utils.addTestCaseTypeArrayString = (attributeData, testCases, lastRowData, messageKey = '') => {
//             let rowData = JSON.parse(JSON.stringify(lastRowData));
//             const { key, testDataValue = {
//                 defaultValue: ['JP', 'VN'],
//                 randomData: {},
//                 isLengthRequired: false,
//                 enumValue: [],
//                 minLengthArray: 0,
//                 maxLengthArray: 10,
//             } } = attributeData;
//             messageKey = messageKey ? messageKey : key;
//             const enumValue = testDataValue.enumValue;
//             const defaultValue = testDataValue.defaultValue;
//             let defaultValueTemp = [];
//             // Invalid value
//             if (!Array.isArray(enumValue) || !enumValue.length) {
//                 defaultValue.forEach((value, index) => {
//                     let tempTestCases = [];
//                     utils.addTestCaseTypeString(attributeData, tempTestCases, {}, `${key}[${index}]`);
//                     tempTestCases.forEach(testCaseData => {
//                         utils.addTestCase(testCases, {
//                             ...rowData,
//                             _TEST_CASE: testCaseData['_TEST_CASE'],
//                             _STATUS_CODE: testCaseData['_STATUS_CODE'],
//                             [key]: [...defaultValueTemp, testCaseData[key]],
//                         });
//                     });
//                     defaultValueTemp.push(value);
//                 })
//             }
//             if (Array.isArray(enumValue) && enumValue.length > 0) {
//                 enumValue.forEach(dataValue => {
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value = ${dataValue}`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: dataValue
//                     });
//                 });
//             }
//             if (testDataValue?.isLengthRequired) {
//                 const minLen = +testDataValue.minLengthArray;
//                 const maxLen = +testDataValue.maxLengthArray;
//                 if (minLen >= 0) {
//                     const minArr = Array.from({ length: minLen }, () => utils.randomString(Math.floor(Math.random() * minLen)));
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${key} length = min length `,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: [...minArr],
//                     });
//                 }
//                 if (maxLen >= 0) {
//                     const maxArr = Array.from({ length: maxLen }, () => utils.randomString(Math.floor(Math.random() * maxLen)));
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${key} length = max length `,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: [...maxArr],
//                     });
//                 }
//             }
//         };

//         // Generate test case that type = ARRAY OBJECT
//         utils.addTestCaseTypeArrayObject = (attributeData, testCases, lastRowData, messageKey = '') => {
//             let rowData = JSON.parse(JSON.stringify(lastRowData));
//             const { key, testDataValue = {
//                 defaultValue: [{}, {}],
//                 enumValue: [],
//                 isLengthRequired: false,
//                 minLengthArray: 1,
//                 maxLengthArray: 10,
//             } } = attributeData;
//             messageKey = messageKey ? messageKey : key;
//             const defaultValue = testDataValue.defaultValue;
//             const enumValue = testDataValue.enumValue;
//             let tempTestCases = [];
//             let lastRow = utils.getLastRowData([], [], attributeData.schema);
//             // default value
//             let defaultValueTemp = [];
//             defaultValue.forEach((value, index) => {
//                 let tempTestCases = [];
//                 let lastRow = utils.getLastRowData([], [], attributeData.schema);
//                 utils.addTestCaseTypeObject(
//                     attributeData,
//                     tempTestCases,
//                     lastRow,
//                     `${key}[${index}]`,
//                 );
//                 tempTestCases.forEach((testCaseData) => {
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: testCaseData["_TEST_CASE"],
//                         _STATUS_CODE: testCaseData["_STATUS_CODE"],
//                         [key]: [...defaultValueTemp, testCaseData[key]],
//                     });
//                 });
//                 defaultValueTemp.push(value);
//             });
//             // Add random object
//             const isLengthRequired = testDataValue?.isLengthRequired || false;
//             if (isLengthRequired) {
//                 const minLen = +testDataValue.minLengthArray;
//                 const maxLen = +testDataValue.maxLengthArray;
//                 if (minLen >= 0) {
//                     const minArr = Array.from({ length: minLen }, (e, index) => utils.randomObject(attributeData.schema, index));
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${key} length = min length `,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: [...minArr],
//                     });
//                 }
//                 if (maxLen >= 0) {
//                     const maxArr = Array.from({ length: maxLen }, (e, index) => utils.randomObject(attributeData.schema, index));
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${key} length = max length `,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: [...maxArr],
//                     });
//                 }
//             }
//             if (Array.isArray(enumValue) && enumValue.length > 0) {
//                 enumValue.forEach(value => {
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${key} length = max length `,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: value,
//                     });
//                 })
//             }
//         };
//         // Generate test case that type = ARRAY DATE
//         utils.addTestCaseTypeArrayDate = (attributeData, testCases, lastRowData, messageKey = '') => {
//             let rowData = JSON.parse(JSON.stringify(lastRowData));
//             const { key, testDataValue = {
//                 defaultValue: ['1970-01-01 00:00:00'],
//                 enumValue: [],
//                 dateFormats: [DATE_TIME_FORMAT],
//                 isLengthRequired: false,
//                 minLengthArray: 1,
//                 maxLengthArray: 10,
//             } } = attributeData;
//             messageKey = messageKey ? messageKey : key;
//             const enumValue = testDataValue.enumValue;
//             if (testDataValue.isLengthRequired) {
//                 const minLen = +testDataValue.minLengthArray;
//                 const maxLen = +testDataValue.maxLengthArray;
//                 if (minLen >= 0) {
//                     const minArr = Array.from({ length: minLen }, () => utils.randomDate(MIN_VALUE.DATE, MAX_VALUE.DATE));
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${key} length = min length `,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: [...minArr],
//                     });
//                 }
//                 if (maxLen >= 0) {
//                     const maxArr = Array.from({ length: maxLen }, () => utils.randomDate(MIN_VALUE.DATE, MAX_VALUE.DATE));
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${key} length = max length `,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: [...maxArr],
//                     });
//                 }
//             }
//             if (Array.isArray(enumValue) && enumValue.length > 0) {
//                 enumValue.forEach(value => {
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${key} length = max length `,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: value,
//                     });
//                 })
//             }
//         };
//         // Generate test case that type = ARRAY ID
//         utils.addTestCaseTypeArrayId = (attributeData, testCases, lastRowData, messageKey = '') => {
//             let rowData = JSON.parse(JSON.stringify(lastRowData));
//             const { key, testDataValue = {
//                 defaultValue: [],
//                 enumValue: [],
//                 isLengthRequired: false,
//                 minLengthArray: 1,
//                 maxLengthArray: 10,
//             } } = attributeData;
//             messageKey = messageKey ? messageKey : key;
//             const enumValue = testDataValue.enumValue;
//             if (Array.isArray(enumValue) && enumValue.length > 0) {
//                 enumValue.forEach((value, index) => {
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${messageKey} value = ${dataValue}`,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: value
//                     });
//                 })
//             }
//             // Check min max elements of array
//             if (testDataValue?.isLengthRequired) {
//                 const minLen = +testDataValue.minLengthArray;
//                 const maxLen = +testDataValue.maxLengthArray;
//                 if (minLen >= 0) {
//                     const minArr = Array.from({ length: minLen }, () => Math.floor(Math.random() * minLen));
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${key} length = min length `,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: [...minArr],
//                     });
//                 }
//                 if (maxLen >= 0) {
//                     const maxArr = maxLen >= 0 ? Array.from({ length: maxLen }, () => Math.floor(Math.random() * maxLen)) : [];
//                     utils.addTestCase(testCases, {
//                         ...rowData,
//                         _TEST_CASE: `${key} length = max length `,
//                         _STATUS_CODE: [responseCode.OK],
//                         [key]: [...maxArr],
//                     });
//                 }
//             }
//         };
//         /*
//         --------- END GENERATE TEST CASE FUNCTION ----------
//         */

//         // Add test case
//         utils.addTestCase = (testCases, data) => {
//             const tempData = JSON.parse(JSON.stringify(data));
//             keyActive = Object.keys(tempData).pop();
//             if (keyActive === '_STATUS_CODE') {
//                 keyActive = keyParentGlobal || '';
//             } else if (keyParentGlobal) {
//                 keyActive = `${keyParentGlobal}.${keyActive}`;
//             }
//             utils.changeDataValue(tempData, keyParentGlobal ? keyActive : '');
//             testCases.push(tempData);
//         };
//         // Add many test case
//         utils.addTestCases = (attributeData, testCases, lastRowDataValue, messageKey = '', keyParent = '') => {
//             let rowData = JSON.parse(JSON.stringify(lastRowDataValue));
//             const { type, key, schema, testDataValue = {}, rules = [], dependValues = [] } = attributeData;
//             if (Object.keys(testDataValue).length > 0) {
//                 let lastRowData = JSON.parse(JSON.stringify(lastRowDataValue));
//                 delete lastRowData[key];
//                 keyParentGlobal = keyParent;
//                 if (type === TYPE.NUMBER) {
//                     utils.addTestCaseTypeNumber(attributeData, testCases, lastRowData, messageKey);
//                 } else if (type === TYPE.ID) {
//                     utils.addTestCaseTypeId(attributeData, testCases, lastRowData, messageKey);
//                 } else if (type === TYPE.PAGE || type === TYPE.LIMIT) {
//                     utils.addTestCaseTypeNumber(attributeData, testCases, lastRowData, messageKey);
//                 } else if (type === TYPE.STRING) {
//                     utils.addTestCaseTypeString(attributeData, testCases, lastRowData, messageKey);
//                 } else if (type === TYPE.ID_STRING) {
//                     utils.addTestCaseTypeIdString(attributeData, testCases, lastRowData, messageKey);
//                 } else if (type === TYPE.DATE) {
//                     utils.addTestCaseTypeDate(attributeData, testCases, lastRowData, messageKey);
//                 } else if (type === TYPE.ARRAY_ID) {
//                     utils.addTestCaseTypeArrayId(attributeData, testCases, lastRowData, messageKey);
//                 } else if (type === TYPE.ARRAY_NUMBER) {
//                     utils.addTestCaseTypeArrayNumber(attributeData, testCases, lastRowData, messageKey);
//                 } else if (type === TYPE.ARRAY_STRING) {
//                     utils.addTestCaseTypeArrayString(attributeData, testCases, lastRowData, messageKey);
//                 } else if (type === TYPE.OBJECT) {
//                     utils.addTestCaseTypeObject(attributeData, testCases, lastRowData, !keyParent ? key : `${keyParent}.${key}`);
//                 } else if (type === TYPE.BOOLEAN) {
//                     utils.addTestCaseTypeBoolean(attributeData, testCases, lastRowData, messageKey);
//                 } else if (type === TYPE.ARRAY_OBJECT) {
//                     utils.addTestCaseTypeArrayObject(attributeData, testCases, lastRowData, messageKey, !keyParent ? key : `${keyParent}.${key}`);
//                 } else if (type === TYPE.ARRAY_DATE) {
//                     utils.addTestCaseTypeArrayDate(attributeData, testCases, lastRowData, messageKey);
//                 } else if (type === TYPE.EMAIL) {
//                     utils.addTestCaseTypeEmail(attributeData, testCases, lastRowData, messageKey);
//                 } else if (type === TYPE.PASSWORD) {
//                     utils.addTestCaseTypePassword(attributeData, testCases, lastRowData, messageKey);
//                 }
//             }
//             if (Array.isArray(rules)) {
//                 rules.forEach(rule => {
//                     // And Rule test case
//                     if (rule?.when) {
//                         let ruleWhen = rule.when || {};
//                         let ruleWhenKey = ruleWhen?.key || 'DefaultKey';
//                         let keyValues = ruleWhen?.keyValue || [];
//                         let compare = ruleWhen?.compare || false;
//                         let operator = ruleWhen?.operator || null;
//                         if (Array.isArray(keyValues) && keyValues.length > 0) {
//                             keyValues.forEach((keyValue) => {
//                                 if (rule?.then) {
//                                     let ruleRowData = JSON.parse(JSON.stringify(rowData));
//                                     let ruleWhenThen = rule.then || {};
//                                     ruleRowData[ruleWhenKey] = keyValue;
//                                     let messageKey = `${ruleWhenKey} = ${keyValue}, ${key}`;
//                                     Object.assign(ruleWhenThen, { key: key });
//                                     utils.addTestCases({
//                                         ...ruleWhenThen,
//                                         key: key,
//                                     }, testCases, ruleRowData, messageKey, keyParent);
//                                 } else {
//                                     ruleRowData[ruleWhenKey] = ruleWhen.keyValue;
//                                     let messageKey = `${ruleWhenKey} = ${ruleWhen.keyValue}, ${key}`;
//                                     utils.addTestCases({
//                                         ...ruleWhenThen,
//                                         key: key,
//                                     }, testCases, ruleRowData, messageKey, keyParent);
//                                 }
//                             })
//                         }
//                         if (compare) {
//                             if (rule?.then) {
//                                 let ruleRowData = JSON.parse(JSON.stringify(rowData));
//                                 let ruleWhenThen = rule.then || {};
//                                 let messageKey = `compare ${ruleWhenKey} and ${key}`;
//                                 let testDataValue = ruleWhenThen.testDataValue;
//                                 if (operator === GREATER && testDataValue.dateFormats[0] !== 'HH:mm')
//                                     ruleWhenThen.testDataValue.max = ruleRowData[ruleWhenKey];
//                                 else if (operator === GREATER && testDataValue.dateFormats[0] === 'HH:mm')
//                                     ruleWhenThen.testDataValue.max = `${new Date().toDateString()} ${ruleRowData[ruleWhenKey]}`;
//                                 else if (operator !== GREATER && testDataValue.dateFormats[0] === 'HH:mm')
//                                     ruleWhenThen.testDataValue.min = `${new Date().toDateString()} ${ruleRowData[ruleWhenKey]}`;
//                                 else ruleWhenThen.testDataValue.min = ruleRowData[ruleWhenKey];
//                                 console.log(ruleWhenThen)
//                                 Object.assign(ruleWhenThen, { key: key });
//                                 switch (ruleWhenThen.type) {
//                                     case TYPE.DATE:
//                                         const temp = (utils.randomDate(new Date(testDataValue.min).getTime(), new Date(testDataValue.max).getTime())).getTime();
//                                         ruleRowData[key] = moment(temp).format(testDataValue.dateFormats[0]);
//                                         break;
//                                     case TYPE.NUMBER:
//                                         ruleRowData[key] = utils.randomNumber(testDataValue.min, testDataValue.max)
//                                         break;
//                                     case TYPE.PASSWORD:
//                                         ruleRowData[key] = ruleRowData[ruleWhenKey];
//                                         break;
//                                     default:
//                                         ruleRowData[key] = null
//                                 }
//                                 utils.addTestCase(testCases, {
//                                     _TEST_CASE: messageKey,
//                                     _STATUS_CODE: [responseCode.OK],
//                                     ...ruleRowData,
//                                 });
//                             }
//                         }
//                     }
//                 })
//             }
//             if (Array.isArray(dependValues)) {
//                 dependValues.forEach(dependValue => {
//                     let ruleRowData = JSON.parse(JSON.stringify(rowData));
//                     let successCase = {};
//                     Object.assign(successCase, ruleRowData);
//                     let when = dependValue?.when || [];
//                     let is = dependValue?.is || [];
//                     when.forEach((keyValue, index) => {
//                         if (is[index] === 'delete_key') {
//                             delete successCase[keyValue];
//                         } else {
//                             successCase[keyValue] = is[index];
//                         }
//                     }
//                     )
//                     if (Array.isArray(dependValue?.then)) {
//                         dependValue?.then.forEach(val => {
//                             successCase[key] = val;
//                             if (val === 'delete_key') delete successCase[key];
//                             const successMess = 'success depends value';
//                             utils.addTestCase(testCases, {
//                                 _TEST_CASE: successMess,
//                                 _STATUS_CODE: [responseCode.OK],
//                                 ...successCase,
//                             });
//                             if (testDataValue?.enumValue) {
//                                 let index = testDataValue?.enumValue?.indexOf(val) || 0;
//                                 if (index == testDataValue?.enumValue?.length - 1) index -= 1;
//                                 else index += 1;
//                             };
//                         })
//                     }
//                 })
//             }
//             return rowData;
//         };

//         // Get last row data request - get the latest test case        
//         utils.getLastRowData = (queryAttributes = [], paramAttributes = [], bodyAttributes = []) => {
//             let lastRowData = {};
//             const tempAttributes = [...queryAttributes, ...paramAttributes, ...bodyAttributes];
//             tempAttributes.forEach(attributeData => {
//                 const { key, schema, type, testDataValue = {} } = attributeData;
//                 const dateFormat = testDataValue.dateFormats;
//                 switch (type) {
//                     case TYPE.DATE:
//                         let defaultValue = testDataValue.defaultValue;
//                         lastRowData[key] = moment(new Date(defaultValue).getTime() - 84600).utc().format(dateFormat[0] || DATE_TIME_FORMAT);
//                         break;
//                     case TYPE.BOOLEAN:
//                         lastRowData[key] = !(testDataValue?.defaultValue?.toString() === 'false');
//                         break;
//                     case TYPE.ARRAY_DATE:
//                         let defaultValues = testDataValue.defaultValue;
//                         const tempData = defaultValues.map(defaultValueEle => {
//                             return moment(new Date(defaultValueEle).getTime() - 84600).utc().format(dateFormat[0] || DATE_TIME_FORMAT)
//                         })
//                         lastRowData[key] = tempData;
//                         break;
//                     case TYPE.ARRAY_OBJECT:
//                         lastRowData[key] = [...testDataValue?.defaultValue];
//                         break;
//                     default:
//                         lastRowData[key] = testDataValue?.defaultValue !== null ? testDataValue?.defaultValue : null;
//                 }
//             });
//             return lastRowData;
//         };

//         // Get all attribute of api that will be tested
//         utils.getObjectAttribute = (queryAttributes = [], paramAttributes = [], bodyAttributes = [], keyParent = '') => {
//             const tempAttributes = [...queryAttributes, ...paramAttributes, ...bodyAttributes];
//             tempAttributes.forEach(attributeData => {
//                 const { key, type, schema, testDataValue = {} } = attributeData;
//                 let keyAttribute = keyParent ? `${keyParent}.${key}` : key;
//                 objectAttribute[keyAttribute] = attributeData;
//                 if (Array.isArray(attributeData.schema) && attributeData.schema.length) {
//                     utils.getObjectAttribute([], [], attributeData.schema, keyAttribute);
//                 }
//             });
//         };


//         // Assert test result
//         utils.assertResponse = (requestName = 'Input Invalid') => {
//             const testCaseIndex = +globals.testCaseIndex || 0;
//             const testCaseData = globals.testCaseData;
//             let testCases = globals.testCases;
//             const nextTestCaseIndex = testCaseIndex + 1;
//             if (testCases.length > nextTestCaseIndex) {
//                 pm.globals.set('testCaseIndex', nextTestCaseIndex);
//                 postman.setNextRequest(requestName);
//             } else {
//                 pm.globals.set('testCaseIndex', 0);
//                 postman.setNextRequest(null);
//             }
//             pm.test(testCaseData['_TEST_CASE'], function () {
//                 pm.expect(pm.response.code).to.be.oneOf(testCaseData['_STATUS_CODE']);
//             });
//         };

//         // Function set and run test cases
//         utils.setAndRunTestCases = (queryAttributes = [], paramAttributes = [], bodyAttributes = []) => {
//             const testCaseIndex = +globals.testCaseIndex || 0;
//             let testCases = globals.testCases || [];
//             if (!testCaseIndex) {
//                 // Adding external libraries to postman
//                 eval(pm.globals.get("randexp"));
//                 utils.getObjectAttribute(queryAttributes, paramAttributes, bodyAttributes);
//                 testCases = [];
//                 let lastRowData = utils.getLastRowData(queryAttributes, paramAttributes, bodyAttributes);
//                 const defaultObject = {};
//                 Object.assign(defaultObject, lastRowData);
//                 utils.addTestCase(testCases, {
//                     _TEST_CASE: 'success case',
//                     _STATUS_CODE: [responseCode.OK],
//                     ...defaultObject,
//                 });
//                 paramAttributes.forEach(attributeData => {
//                     lastRowData = utils.addTestCases(attributeData, testCases, lastRowData);
//                     keyParentGlobal = '';
//                     keyActive = '';
//                 });
//                 queryAttributes.forEach(attributeData => {
//                     lastRowData = utils.addTestCases(attributeData, testCases, lastRowData);
//                     keyParentGlobal = '';
//                     keyActive = '';
//                 });
//                 bodyAttributes.forEach(attributeData => {
//                     lastRowData = utils.addTestCases(attributeData, testCases, lastRowData);
//                     keyParentGlobal = '';
//                     keyActive = '';
//                 });
//                 keyParentGlobal = '';
//                 keyActive = '';
//                 pm.globals.set('testCases', testCases);
//             }
//             const testCaseData = testCases[testCaseIndex];
//             pm.globals.set('testCaseData', testCaseData);
//             const queryAttributeTitles = queryAttributes.map(a => a.key);
//             if (queryAttributeTitles.length) {
//                 utils.setQueryRequest(queryAttributeTitles, testCaseData);
//             }
//             const paramAttributeTitles = paramAttributes.map(a => a.key);
//             if (paramAttributeTitles.length) {
//                 utils.setParamRequest(paramAttributeTitles, testCaseData);
//             }
//             const bodyAttributeTitles = bodyAttributes.map(a => a.key);
//             if (bodyAttributeTitles.length) {
//                 utils.setBodyRequest(bodyAttributeTitles, testCaseData);
//             }
//         };
//         return utils;
//     } + '; loadUtils();');
//     // End load utils
//     clearInterval(_dummy);
// })();