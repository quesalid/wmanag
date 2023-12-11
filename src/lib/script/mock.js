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

export const filterArray = (array, filters, neg = false) => {
    if (filters && filters.length) {
        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i]
            switch (filter.op) {
                case "eq":
                    if (!neg)
                        array = array.filter((item) => { return getPropByString(item,filter.name) == filter.value })
                    else
                        array = array.filter((item) => { return getPropByString(item, filter.name) != filter.value })
                    break;
                case "neq":
                    if (!neg)
                        array = array.filter((item) => { return getPropByString(item, filter.name) != filter.value })
                    else
                        array = array.filter((item) => { return getPropByString(item, filter.name) == filter.value })
                    break;
                case "leq":
                    if (!neg)
                        array = array.filter((item) => { return getPropByString(item, filter.name) <= filter.value })
                    else
                        array = array.filter((item) => { return getPropByString(item, filter.name) > filter.value })
                    break;
                case "le":
                    if (!neg)
                        array = array.filter((item) => { return getPropByString(item, filter.name) < filter.value })
                    else
                        array = array.filter((item) => { return getPropByString(item, filter.name) >= filter.value })
                    break;
                case "geq":
                    if (!neg)
                        array = array.filter((item) => { return getPropByString(item, filter.name) >= filter.value })
                    else
                        array = array.filter((item) => { return getPropByString(item, filter.name) < filter.value })
                    break;
                case "gr":
                    if (!neg)
                        array = array.filter((item) => { return getPropByString(item, filter.name) > filter.value })
                    else
                        array = array.filter((item) => { return getPropByString(item, filter.name) <= filter.value })
                    break;
                case "in":
                    if (!neg)
                        array = array.filter((item) => { return getPropByString(item, filter.name).includes(filter.value) })
                    else
                        array = array.filter((item) => { return !getPropByString(item, filter.name).includes(filter.value) })
                    break;
            }
        }
    }
    return array
}


