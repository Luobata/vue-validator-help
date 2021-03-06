import {
    has,
    isFun,
} from './util/index';

export default (vNode, obj) => {
    const attrs = obj || vNode.data.attrs;
    const validate = {};
    const text = attrs.text || '';

    // 正则表达式
    if (has(attrs, 'regexp')) {
        validate.regexp = {
            value: attrs.regexp,
            text,
        };
    }

    // 最小值 必须是数字 大写为不包括边界值
    if (has(attrs, 'min')) {
        validate.min = {
            value: attrs.min,
            text,
        };
    }

    if (has(attrs, 'Min')) {
        validate.Min = {
            value: attrs.Min,
            text,
        };
    }

    // 最大值 必须是数字
    if (has(attrs, 'max')) {
        validate.max = {
            value: attrs.max,
            text,
        };
    }

    if (has(attrs, 'Max')) {
        validate.Max = {
            value: attrs.Max,
            text,
        };
    }

    // 最小长度 必须是数字
    if (has(attrs, 'min-length')) {
        validate['min-length'] = {
            value: attrs['min-length'],
            text,
        };
    }

    // 最大长度 必须是数字
    if (has(attrs, 'max-length')) {
        validate['max-length'] = {
            value: attrs['max-length'],
            text,
        };
    }

    if (has(attrs, 'Min-length')) {
        validate['Min-length'] = {
            value: attrs['Min-length'],
            text,
        };
    }

    if (has(attrs, 'Max-length')) {
        validate['Max-length'] = {
            value: attrs['Max-length'],
            text,
        };
    }

    // 必填
    if (has(attrs, 'required')) {
        validate.required = {
            value: attrs.required,
            text,
        };
    }

    // 数字的可以考虑合在一起
    // 数字 可以是字符串数字
    // int or float
    if (has(attrs, 'number')) {
        validate.number = {
            value: attrs.number || 'int',
            text,
        };
    }

    // 数字 不能是字符串数字
    if (has(attrs, 'Number')) {
        validate.Number = {
            value: attrs.Number || 'int',
            text,
        };
    }

    // 正数 含0
    if (has(attrs, 'positive')) {
        validate.positive = {
            value: attrs.positive,
            text,
        };
    }

    // 正数 不含0
    if (has(attrs, 'Positive')) {
        validate.Positive = {
            value: attrs.Positive,
            text,
        };
    }

    // 负数 含0
    if (has(attrs, 'negative')) {
        validate.negative = {
            value: attrs.negative,
            text,
        };
    }

    // 负数 不含0
    if (has(attrs, 'Negative')) {
        validate.Negative = {
            value: attrs.Negative,
            text,
        };
    }

    // email
    if (has(attrs, 'email')) {
        validate.email = {
            value: attrs.email,
            text,
        };
    }

    // phone
    if (has(attrs, 'phone')) {
        validate.phone = {
            value: attrs.phone,
            text,
        };
    }

    if (has(attrs, 'max-float-length')) {
        validate['max-float-length'] = {
            value: attrs['max-float-length'],
            text,
        };
    }

    if (has(attrs, 'min-float-length')) {
        validate['min-float-length'] = {
            value: attrs['min-float-length'],
            text,
        };
    }

    if (has(attrs, 'Max-float-length')) {
        validate['Max-float-length'] = {
            value: attrs['Max-float-length'],
            text,
        };
    }

    if (has(attrs, 'Min-float-length')) {
        validate['Min-float-length'] = {
            value: attrs['Min-float-length'],
            text,
        };
    }

    // phone
    if (has(attrs, 'fun')) {
        if (!isFun(attrs.fun)) {
            /* eslint-disable no-console */
            console.error('wrone fun type');
            /* eslint-disable no-console */
        } else {
            validate.fun = {
                value: attrs.fun,
                text,
            };
        }
    }

    return validate;
};
