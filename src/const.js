import {Calculator} from "./Calculator";

export const CALCULATOR = new Calculator()

export const SCOREBOARD = document.getElementById("scoreboard")
export const NUMBERS = document.querySelectorAll("button.number")
export const SIGNS = document.getElementsByName("sign")
export const BACKSPACE = document.getElementById("backspace")
export const ONE_VALUE_COMMANDS = document.getElementsByName("oneValueCommands")
export const TWO_VALUE_COMMANDS = document.getElementsByName("twoValueCommands")
export const MEMORIES = document.getElementsByName("memory")
export const PREV_VALUE_BTN = document.getElementById("prevValue")

export const MEM_VALUE = document.getElementById("memValue")
export const DARK_THEME_BTN = document.getElementById("darkTheme")
export const LIGHT_THEME_BTN = document.getElementById("lightTheme")
export const THEME_WRAP = document.getElementById("themeWrap")
export const MEMORY_WRAP = document.getElementById("memoryWrap")
export const ALL_ELEMENTS = document.querySelectorAll("*")
export const BODY = document.querySelectorAll('body')[0]
export const ERROR = document.getElementById("errorMessage")

export const SIGN_VALUES = ["+", "-", "×", "÷"]

const STATE = {
  x: 0,
  y: 0,
  signIndex: 0,
  command: "",
  theme: "dark",
  overflow: false,
}

export const CURRENT_STATE = new Proxy(STATE, {
  set: function (target, key, value) {
    if (key === 'command') {
      TWO_VALUE_COMMANDS.forEach(com => com.style.backgroundColor = com.value === value ? "#ff8000" : '#5a5b5c')
    }
    target[key] = value
    return true
  }
})
