export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  return password.length > 0
}

export interface ValidationErrors {
  email?: string
  password?: string
}

export const validateLoginForm = (email: string, password: string): ValidationErrors => {
  const errors: ValidationErrors = {}

  if (!email) {
    errors.email = "Email is required"
  } else if (!validateEmail(email)) {
    errors.email = "Please enter a valid email address"
  }

  if (!password) {
    errors.password = "Password is required"
  }

  return errors
}
