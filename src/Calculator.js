export class Calculator {
  constructor() {
    this.value = 0
    this.history = []
  }

  resetValue(value) {
    this.value = value
    this.history = []
  }

  executeCommand(command) {
    this.value = command.execute(this.value)
    this.history.push(command)
  }

  undo() {
    const command = this.history.pop()
    this.value = command.undo(this.value)
  }
}