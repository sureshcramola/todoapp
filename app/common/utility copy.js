import Global from "./global";

export default {
  /**
   * function for storing the data in localStorage
   */
  setData: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },

  /**
   * function for getting the data from localStorage
   */
  getData: key => JSON.parse(localStorage.getItem(key)),

  /**
   * function for clearing particular key from localStorage
   */
  clearData: (key) => {
    localStorage.removeItem(key);
  },

  /**
   * function for clearing all data from localStorage
   */
  clearAllData: () => {
    localStorage.clear();
  },

  /**
   * function for checking the user input.
   */
  checkInput(name, value) {
    let isValid = true;
    switch (name) {
      case "name":
        const alphaRegex = Global.regex.alpha;
        isValid = alphaRegex.test(value);
        break;
      case "phoneNo":
        const phoneNoRegex = Global.regex.phoneNumber;
        isValid = phoneNoRegex.test(value);
        break;
      case "otp":
        const numericRegex = Global.regex.numeric;
        isValid = numericRegex.test(value);
        break;
      default:
    }
    return isValid;
  },

  /**
    * function for getting the user type info.
   */
  getUserTypeInfo(userType) {
    let userInfo = {
      admin: false,
      staff: false,
      superUser: false
    }
    switch (userType) {
      case 'Staff':
        userInfo.staff = true;
        break;
      case 'Admin':
        userInfo.staff = true;
        userInfo.admin = true;
        break;
      case 'Super User':
        userInfo.staff = true;
        userInfo.admin = true;
        userInfo.superUser = true;
        break;
      default:
    }
    return userInfo;
  },

  /**
   * function for getting the values object from model
   */
  getModelValues(model) {
    let data = {};
    for (let keys in model) {
      data[keys] = model[keys].value;
    }
    return data;
  },

  /**
   * function to convert unix timestamp to local date
   */
  convertUnixTimestampToDate(timestamp) {
    // Months array
    let monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let date = new Date(timestamp * 1000);
    let year = date.getFullYear(); // Year
    let month = monthArray[date.getMonth()]; // Month
    let day = ("0" + date.getDate()).slice(-2); // Day
    // Display date time in MM-dd-yyyy h:m:s format
    let convertedDate = day + '/' + month + '/' + year;

    return convertedDate;
  },

  /**
   * function for setting the token into the localStorage.
  */
  setToken(tokenType, token) {
    // Getting the user id and set it to the localStorage.
    if (tokenType === 'accessToken') {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      this.setData('userEmail', JSON.parse(window.atob(base64)).email);
    }
    this.setData(tokenType, token);
  },

  /**
   * function for getting the token from the localStorage.
   */
  getToken(key) {
    const data = this.getData(key);
    if (data === null) {
      return '';
    }
    return data;
  },

  stringToBoolean(string) {
    if (string) {
      switch (string.toLowerCase().trim()) {
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(string);
      }
    }
    return false;
  },
};
