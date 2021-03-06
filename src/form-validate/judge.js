import {
    has,
    isInt,
    isFloat,
    isObj,
    isFun,
    isStr,
    isArr,
    isFalse,
    isRequired,
    isTelphone,
    isEmail,
    ispositive,
    isPositive,
    isnegative,
    isNegative,
    getChineseLength,
} from './util/index';
import { userConfig } from './conf';
import anlyse from './anlyse';


const getTarget = item => (item.com.elm);
const config = Object.assign({}, userConfig);

const getLength = (val) => {
    let type = config.lengthType;
    let len = 0;

    if (isArr(val)) {
        type = 'arr';
    }

    if (isStr(type)) {
        switch (type) {
        case 'arr':
        case 'eng':
            len = val.length;
            break;
        case 'chi':
            len = getChineseLength(val);
            break;
        default:
            break;
        }
    } else if (isFun(type)) {
        len = type(val);
    }

    return len;
};

const getFloatLength = (val) => {
    const reg = /.*?[.](\d*)/;
    const floatNum = val.match(reg);
    const type = config.floatLengthType;
    let len = 0;
    if (type === 'normal') {
        if (floatNum && floatNum.length && floatNum[1]) {
            len = floatNum[1].length;
        }
    } else if (isFun(type)) {
        len = type(val);
    }

    return len;
};

const { isNaN } = Number;


const judge = (validate, value, item, $parent, Vue) => {
    let type;
    let val;
    let length;
    let floatLen;
    let key;
    const target = getTarget(item);
    const errors = {
        type: '',
        detail: [],
    };
    const text = validate.text || '';
    Object.assign(config, Vue.config);
    Object.assign(config, validate.config);
    const cal = (vals) => {
        const v = has(vals, 'value') ? vals.value : vals;
        if (isFun(v)) {
            return v.call($parent, value);
        }

        return v;
    };

    class Error {
        // errorTpl = {
        //    key: '', // error key like min max
        //    value: '', // key value
        //    actual: '', // actual value
        // };

        /* eslint-disable no-shadow */
        constructor(key, value, actual, target) {
            this.key = key;
            this.value = value;
            this.actual = actual;
            this.target = target;
            this.text = validate[key].text || text;
        }
        /* eslint-disable no-shadow */
    }

    if (has(validate, 'min') ||
        has(validate, 'max') ||
        has(validate, 'Min') ||
        has(validate, 'Max')
    ) {
        type = 'number';
    }

    if (has(validate, 'min-length') ||
        has(validate, 'max-length') ||
        has(validate, 'Min-length') ||
        has(validate, 'Max-length')
    ) {
        length = getLength(value);
    }

    if (has(validate, 'min-float-length') ||
        has(validate, 'max-float-length') ||
        has(validate, 'Min-float-length') ||
        has(validate, 'Max-float-length')
    ) {
        floatLen = getFloatLength(value);
    }

    switch (type) {
    case 'number':
        val = parseFloat(value, 10);
        if (value !== ''
                && value !== undefined
                && isNaN(val)) {
            errors.type = 'wrong type';
        }
        break;
    default:
        val = value;
    }

    if (errors.type) {
        return errors;
    }

    key = 'fun';
    if (has(validate, key)) {
        const fnR = validate[key].value.call($parent, value);
        if (isFalse(fnR)) {
            errors.detail.push(new Error(key, fnR, value, target));
        } else if (isObj(fnR)) {
            const any = anlyse('', fnR);
            any.text = text;
            // 重新考虑type
            errors.detail = errors.detail.concat(judge(any, value, item, $parent, Vue).detail);
        }
    }

    key = 'min';
    if (has(validate, key) && val <= cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), value, target));
    }

    key = 'max';
    if (has(validate, key) && val >= cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), value, target));
    }

    key = 'Min';
    if (has(validate, key) && val < cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), value, target));
    }

    key = 'Max';
    if (has(validate, key) && val > cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), value, target));
    }

    key = 'min-length';
    if (has(validate, key) && length <= cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), length, target));
    }

    key = 'max-length';
    if (has(validate, key) && length >= cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), length, target));
    }

    key = 'Min-length';
    if (has(validate, key) && length < cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), length, target));
    }

    key = 'Max-length';
    if (has(validate, key) && length > cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), length, target));
    }

    key = 'min-float-length';
    if (has(validate, key) && floatLen <= cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), floatLen, target));
    }

    key = 'max-float-length';
    if (has(validate, key) && floatLen >= cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), floatLen, target));
    }

    key = 'Min-float-length';
    if (has(validate, key) && floatLen < cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), floatLen, target));
    }

    key = 'Max-float-length';
    if (has(validate, key) && floatLen > cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), floatLen, target));
    }

    key = 'required';
    if (has(validate, 'required') && !isFalse(cal(validate[key])) && !isRequired(value)) {
        errors.detail.push(new Error('required', '', value, target));
    }

    key = 'phone';
    if (has(validate, key) && !isFalse(cal(validate[key])) && !isTelphone(value)) {
        errors.detail.push(new Error(key, '', value, target));
    }

    key = 'email';
    if (has(validate, key) && !isFalse(cal(validate[key])) && !isEmail(value)) {
        errors.detail.push(new Error(key, '', value, target));
    }

    key = 'positive';
    if (has(validate, key) && !isFalse(cal(validate[key])) && !ispositive(value)) {
        errors.detail.push(new Error(key, '', value, target));
    }

    key = 'Positive';
    if (has(validate, key) && !isFalse(cal(validate[key])) && !isPositive(value)) {
        errors.detail.push(new Error(key, '', value, target));
    }

    key = 'negative';
    if (has(validate, key) && !isFalse(cal(validate[key])) && !isnegative(value)) {
        errors.detail.push(new Error(key, '', value, target));
    }

    key = 'Negative';
    if (has(validate, key) && !isFalse(cal(validate[key])) && !isNegative(value)) {
        errors.detail.push(new Error(key, '', value, target));
    }

    key = 'number';
    if (has(validate, key)) {
        if (validate.number.value === 'int') {
            if (!isInt(val, false)) {
                errors.detail.push(new Error('number', '', val, target));
            }
        } else if (validate.number.value === 'float') {
            if (!isFloat(val, false)) {
                errors.detail.push(new Error('number', '', val, target));
            }
        }
    }

    key = 'Number';
    if (has(validate, key)) {
        if (validate.Number.value === 'int') {
            if (isInt(val)) {
                errors.detail.push(new Error('Number', '', val, target));
            }
        } else if (validate.Number.value === 'float') {
            if (isFloat(val)) {
                errors.detail.push(new Error('Number', '', val, target));
            }
        }
    }

    key = 'regexp';
    if (has(validate, key) && !(new RegExp(validate[key].value).test(value))) {
        errors.detail.push(new Error(key, '', value, target));
    }


    return errors;
};

export default judge;
