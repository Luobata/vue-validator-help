import { 
    isEmptyObj,
    isObj,
} from './util/index.js';

const covert = (str) => {
    let key;
    switch (str) {
        case 'minlength':
        key = 'min-length';
    }
    key = str.replace(/([min|max|Min|Max])(length)/, '$1-$2');
    return key;
};

export default (rule) => {
    if (!isObj(rule)) return {};

    let errorText = rule.text || '';
    let validate = rule.validate || {};
    let trigger = rule.trigger || '';
    let rules = {};

    for (let i in validate) {
        const item = validate[i];
        rules[i] = {};
        for (let j in item) {
            const value = item[j];
            const key = covert(j);
            if (isObj(value)) {
                rules[i][key] = value;
            } else {
                rules[i][key] = {
                    value,
                    text: errorText,
                };
            }
        }
    }

    return rules;
};