// @ts-nocheck
let buttons = []
let lights = []
let knobs = []

const cpPushButton = async function (body) {
    const index = buttons.findIndex((item) => { item.name == body.option.name })
    if (index > -1) {
        buttons[index].value = body.option.status
        return (buttons[index])
    }
    return(null)
}

const CONTROLLER = {
    cpPushButton
}

export default CONTROLLER