
export const passCheck = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/
export const usernameCheck = /^(?=.*[a-zA-Z0-9])(?=.{4,})/
export const emailCheck = /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/