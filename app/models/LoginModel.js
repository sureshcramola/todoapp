import ErrorMessages from "../common/errorMessages";
import Global from "../common/global";

export default class LoginModel {
  constructor() {
    this.email = {
      value: "",
      readOnly: false,
      encrypt: false,
      error: false,
      errorMessage: ""
    };
    this.password = {
      value: "",
      readOnly: false,
      encrypt: false,
      visible: false,
      error: false,
      errorMessage: ""
    };
    this.confirmPassword = {
      value: "",
      readOnly: false,
      encrypt: false,
      visible: false,
      error: false,
      errorMessage: ""
    };
    this.otp = {
      value: "",
      readOnly: false,
      encrypt: false,
      error: false,
      errorMessage: ""
    };
  }

  validation() {
    // Validation for email
    let isValid = true;
    isValid = this.emailValidation(false);

    // Validation for Password
    if (!this.password.value) {
      isValid = false;
      this.password.error = true;
      this.password.errorMessage = ErrorMessages.passwordRequired;
    }

    return {
      isValid: isValid,
      form: this
    };
  }

  emailValidation(onlyEmail = true) {
    let isValid = true;
    if (this.email.value) {
      const emailRegex = Global.regex.email;
      if (!emailRegex.test(this.email.value)) {
        isValid = false;
        this.email.error = true;
        this.email.errorMessage = ErrorMessages.emailValidation;
      }
    } else {
      isValid = false;
      this.email.error = true;
      this.email.errorMessage = ErrorMessages.emailRequired;
    }

    if (onlyEmail) {
      return {
        isValid: isValid,
        form: this
      };
    }
    return isValid;
  }

  checkPasswordValidation() {
    let isValid = true;
    // Validation for Password
    if (!this.password.value) {
      isValid = false;
      this.password.error = true;
      this.password.errorMessage = ErrorMessages.passwordRequired;
    }
    // Validation for Confirm Password
    if (!this.confirmPassword.value) {
      isValid = false;
      this.confirmPassword.error = true;
      this.confirmPassword.errorMessage = ErrorMessages.confirmPasswordRequired;
    } else if (this.password.value !== this.confirmPassword.value) {
      isValid = false;
      this.confirmPassword.error = true;
      this.confirmPassword.errorMessage = ErrorMessages.passwordMismatch;
    }
    return {
      isValid: isValid,
      form: this
    };
  }

  checkOtpValidation() {
    let isValid = true;
    if (this.otp.value) {
      if (!Global.regex.otp.test(this.otp.value)) {
        isValid = false;
        this.otp.error = true;
        this.otp.errorMessage = ErrorMessages.otpValidation;
      }
    } else {
      isValid = false;
      this.otp.error = true;
      this.otp.errorMessage = ErrorMessages.otpRequired;
    }
    return {
      isValid: isValid,
      form: this
    };
  }

  getParams() {
    return {
      email: this.email.value,
      password: this.password.value
    }
  }
}
