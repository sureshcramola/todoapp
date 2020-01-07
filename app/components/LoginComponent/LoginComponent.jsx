import React, { Component, Suspense } from "react";
import { Col, Row, Container, Form } from "react-bootstrap";
import LoginModel from "../../../models/LoginModel";
import Utility from "../../../common/utility";
import errorMessage from "../../../common/errorMessages";
import Button from "../../UI/Button/Button";
import InputField from "../../UI/InputField/InputField";
import Toast from "../../UI/Toast/Toast";
import PasswordField from "../../UI/PasswordField/PasswordField";
import "./login.scss";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: new LoginModel(),
      isForgotPasswordModalOpen: false,
      isVerifyOtpModalOpen: false,
      isSetPasswordModalOpen: false,
      responseType: '',
      responseTitle: '',
      responseMessage: '',
      forgotEmail: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.toggleForgotPasswordModal = this.toggleForgotPasswordModal.bind(this);
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
    this.showToast = this.showToast.bind(this);
    this.setToastData = this.setToastData.bind(this);
    this.toggleVerifyOtpModal = this.toggleVerifyOtpModal.bind(this);
    this.toggleSetPasswordModal = this.toggleSetPasswordModal.bind(this);
    this.otpSendSuccess = this.otpSendSuccess.bind(this);
    this.otpVerifySuccess = this.otpVerifySuccess.bind(this);
  }

  componentDidMount() {
    if (this.props.loginStore.isUserLogin) {
      this.props.history.push("/cmr");
    }
  }

  onInputChange(e) {
    let valid = Utility.checkInput(e.target.name, e.target.value);
    if (valid) {
      let form = this.state.form;
      form[e.target.name].value = e.target.value;
      form[e.target.name].error = false;
      form[e.target.name].errorMessage = "";
      this.setState({ form });
    }
  }

  checkFormValidation() {
    let validated = this.state.form.validation();
    if (validated.isValid) {
      return true;
    } else {
      this.setState({ form: validated.form });
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    if (this.checkFormValidation()) {
      const { history } = this.props;
      this.props.sharedStore.showLoader();
      const params = this.state.form.getParams();
      this.props.loginStore
        .login(params)
        .then(res => {
          this.props.sharedStore.hideLoader();
          if (res.responseCode === 200) {
            Utility.setData("userId", res.id);
            this.props.loginStore.isUserLogin = true;
            this.props.loginStore.userEmail = params.email;
            this.props.loginStore.userName = res.userName;
            this.props.loginStore.userType = res.userType;
            history.push("/cmr");
          } else {
            this.setToastData('error',res.message);
          }
        })
        .catch(err => {
          this.props.sharedStore.hideLoader();
          this.setToastData('error',errorMessage.networkError);
          console.log("err", err);
        });
    }
  }

  togglePasswordVisibility() {
    let form = this.state.form;
    form.password.visible = !form.password.visible;
    this.setState({ form });
  }

  toggleForgotPasswordModal() {
    this.setState({
      isForgotPasswordModalOpen: !this.state.isForgotPasswordModalOpen
    });
  }

  toggleSetPasswordModal() {
    this.setState({
      isSetPasswordModalOpen: !this.state.isSetPasswordModalOpen
    });
  }

  toggleVerifyOtpModal() {
    this.setState({
      isVerifyOtpModalOpen: !this.state.isVerifyOtpModalOpen
    });
  }

  otpSendSuccess(email) {
    this.setState({
      isForgotPasswordModalOpen: false,
      isVerifyOtpModalOpen: true,
      forgotEmail: email
    })
  }

  otpVerifySuccess() {
    this.setState({
      isVerifyOtpModalOpen: false,
      isSetPasswordModalOpen: true
    })
  }

  render() {
    const { form } = this.state;
    return (
      <section className="login-section">
        <Container>
          <Row>
            <Col xs={12} md={6} lg={7}>
              <h2 className="text-uppercase">todo app</h2>
            </Col>
            <Col xs={12} md={6} lg={5}>
              <div className="login-form-wrapper">
                <h4 className="text-center text-uppercase">Login</h4>
                <Form onSubmit={this.onFormSubmit}>
                  {/* Email Field */}
                  <InputField
                    type="text"
                    class=""
                    name="email"
                    placeholder="Enter Your Email"
                    onChange={this.onInputChange}
                    value={form.email.value}
                    error={form.email.error}
                    errorMessage={form.email.errorMessage}
                  />

                  {/* Password Field */}
                  <PasswordField
                    label=""
                    type={form.password.visible ? "text" : "password"}
                    class="form-control"
                    inputWrapperClass="password-form-group"
                    name="password"
                    placeholder="Enter Your Password"
                    onChange={this.onInputChange}
                    value={form.password.value}
                    error={form.password.error}
                    errorMessage={form.password.errorMessage}
                    btnHandler={this.togglePasswordVisibility}
                  />
                  <Form.Group className="text-right">
                    <Button
                      btnClass="forgot-link"
                      btnType="button"
                      btnVariant="link"
                      clickHandler={() => this.toggleForgotPasswordModal()}
                    >
                      Forgot your password ?
                    </Button>
                  </Form.Group>
                  <Form.Group className="text-center">
                    <Button btnClass="app-btn btn-xl" btnType="submit">
                      Login
                    </Button>
                  </Form.Group>
                </Form>
              </div>
            </Col>
          </Row>

          {/* Forgot Password Modal */}
          {this.state.isForgotPasswordModalOpen ? (
            <Suspense fallback="">
               <ForgotPassword
                modalHandler={this.toggleForgotPasswordModal}
                modalVisibility={this.state.isForgotPasswordModalOpen}
                otpSendSuccess={this.otpSendSuccess}
                setToastData={this.setToastData}
              /> 
              {/*<ChangePassword modalHandler={this.toggleForgotPasswordModal}
                modalVisibility={this.state.isForgotPasswordModalOpen} />
                otpSendSuccess={this.otpSendSuccess}
              /> */}
            </Suspense>
          ) : null}
          
        </Container>

         {/* Error, Success Message Taost */}
         <Toast toastRef={(el) => this.growl = el} />
      </section>
    );
  }
}

export default LoginComponent;
