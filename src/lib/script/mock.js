const  getPropByString = (obj, propString) => {
    if (!propString)
        return obj;

    var prop, props = propString.split('.');

    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
        prop = props[i];

        var candidate = obj[prop];
        if (candidate !== undefined) {
            obj = candidate;
        } else {
            break;
        }
    }
    return obj[props[i]];
}

/**
 * Filter array
 * @param {any} array array to filter
 * @param {any} filters array of objects {field:value,type:value}
 * @param {any} neg true inverts the filter
 * @returns
 */
export const filterArray = (array, filters, neg = false) => {
    if (filters && filters.length) {
        for (let i = 0; i < filters.length; i++) {
            let f = filters[i]
            let keys = Object.keys(f)
            let key = keys[0] != 'type' ? keys[0] : keys[1]
            switch (f.type) {
                case "eq":
                    if (!neg)
                        array = array.filter((item) => { return item[key] == f[key]})
                    else
                        array = array.filter((item) => { return item[key] != f[key]})
                    break;
                case "neq":
                    if (!neg)
                        array = array.filter((item) => { return item[key] != f[key] })
                    else
                        array = array.filter((item) => { return item[key] == f[key] })
                    break;
                case "leq":
                    if (!neg)
                        array = array.filter((item) => { return item[key] <= f[key] })
                    else
                        array = array.filter((item) => { return item[key] > f[key] })
                    break;
                case "le":
                    if (!neg)
                        array = array.filter((item) => { return item[key] < f[key] })
                    else
                        array = array.filter((item) => { return item[key] >= f[key] })
                    break;
                case "geq":
                    if (!neg)
                        array = array.filter((item) => { return item[key] >= f[key] })
                    else
                        array = array.filter((item) => { return item[key] < f[key] })
                    break;
                case "gr":
                    if (!neg)
                        array = array.filter((item) => { return item[key] > f[key] })
                    else
                        array = array.filter((item) => { return item[key] <= f[key] })
                    break;
                case "like":
                    if (!neg)
                        array = array.filter((item) => { return item[key].includes(f[key]) })
                    else
                        array = array.filter((item) => { return !item[key].includes(f[key]) })
                    break;
            }
        }
    }
    return array
}


