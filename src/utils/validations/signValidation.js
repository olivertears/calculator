import {CALCULATOR, CURRENT_STATE, ERROR_MESSAGE, SCOREBOARD, SIGN_VALUES} from "../../consts";
import {chooseCommand} from "../chooseCommand";

export const signValidation = (sign) => {
  const lastSymbolIsSign = SIGN_VALUES.includes(SCOREBOARD.value[SCOREBOARD.value.length - 1])

  if (lastSymbolIsSign) {
    replaceSign(sign)
  } else if (CURRENT_STATE.command) {
    twoSignCommandHandler(sign)
  } else if (SCOREBOARD.value.length) {
    arithmeticCommandHandler(sign)
  } else {
    addMinusOrPlusIfNeeded(sign)
  }
}

const replaceSign = (sign) => {
  const signIsMinusOrPlus = sign.value === '-' || sign.value === '+'
  const canChangeTheSign = (SCOREBOARD.value.length > 1 && sign.value !== "=") || (SCOREBOARD.value.length === 1 && signIsMinusOrPlus)

  if (canChangeTheSign) {
    SCOREBOARD.value = SCOREBOARD.value.substring(0, SCOREBOARD.value.length - 1) + sign.value
  } else {
    ERROR_MESSAGE.innerHTML = "Can't put this sign here"
  }
}

const twoSignCommandHandler = (sign) => {
  const signIsMinusOrPlus = sign.value === '-' || sign.value === '+'

  if (!SCOREBOARD.value && signIsMinusOrPlus) {
    SCOREBOARD.value += sign.value
  } else if ((!SCOREBOARD.value || !Number.isFinite(Number(SCOREBOARD.value)))) {
    ERROR_MESSAGE.innerHTML = "Write N value"
  } else if (Number(SCOREBOARD.value) === 0 && CURRENT_STATE.command === "x^1/n") {
    ERROR_MESSAGE.innerHTML = "Division by 0"
  } else if (CURRENT_STATE.command === "x^1/n" && Number(SCOREBOARD.value) % 2 === 0 && CALCULATOR.value < 0) {
    ERROR_MESSAGE.innerHTML = "For negative numbers only odd roots available"
  } else {
    CALCULATOR.executeCommand(chooseCommand(CURRENT_STATE.command, Number(SCOREBOARD.value)))
    SCOREBOARD.value = String(CALCULATOR.value)
    CURRENT_STATE.command = ""
    CURRENT_STATE.signIndex = sign.value === "=" ? 0 : SCOREBOARD.value.length
    SCOREBOARD.value += sign.value === "=" ? "" : sign.value
  }
}

const arithmeticCommandHandler = (sign) => {
  if (CURRENT_STATE.signIndex) {
    let y = Number(SCOREBOARD.value.substring(CURRENT_STATE.signIndex + 1, SCOREBOARD.value.length))
    if (Number.isFinite(y)) {
      CALCULATOR.executeCommand(chooseCommand(SCOREBOARD.value[CURRENT_STATE.signIndex], y))
      SCOREBOARD.value = String(CALCULATOR.value)
      CURRENT_STATE.signIndex = sign.value === "=" ? 0 : SCOREBOARD.value.length
      SCOREBOARD.value += sign.value === "=" ? "" : sign.value
    }
  } else if (Number.isFinite(Number(SCOREBOARD.value))) {
    CALCULATOR.resetValue(Number(SCOREBOARD.value))
    CURRENT_STATE.signIndex = sign.value === "=" ? 0 : SCOREBOARD.value.length
    SCOREBOARD.value += sign.value === "=" ? "" : sign.value
  }
}

const addMinusOrPlusIfNeeded = (sign) => {
  const signIsMinusOrPlus = sign.value === '-' || sign.value === '+'

  if (signIsMinusOrPlus) {
    SCOREBOARD.value += sign.value
  } else {
    ERROR_MESSAGE.innerHTML = "Can't start with this sign"
  }
}
