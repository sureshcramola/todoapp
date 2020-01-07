const global = {
  regex: {
    email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    alpha: /^[a-zA-Z\s.]*$/,
    alphaOnly: /^[a-zA-Z\s]*$/,
    numeric: /^[0-9]*$/,
    alphaNumeric: /^[a-zA-Z0-9]*$/,
    name: /^[a-zA-Z\s.]{2,}$/,
    description: /^[a-zA-Z\s.]{5,}$/,
    otp: /^[0-9]{6}$/,
    phoneNumber: /^[+]{0,1}[0-9]*$/
  }
};

export default global;
