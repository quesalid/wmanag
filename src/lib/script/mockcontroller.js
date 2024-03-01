// @ts-nocheck
let buttons = []
let lights = []
let knobs = []

const cpPushButton = async function (body) {
    const index = buttons.findIndex((item) => { item.name == body.option.name })
    if (index > -1) {
        buttons[index].status = body.option.status
        return (buttons[index])
    }
    return(null)
}

const cpTurnKnob = async function (body) {
    const index = knobs.findIndex((item) => { item.name == body.option.name })
    if (index > -1) {
        knobs[index].value = body.option.value
        return (knobs[index])
    }
    return (null)
}

const CONTROLLER = {
    cpPushButton,
    cpTurnKnob
}

export default CONTROLLER