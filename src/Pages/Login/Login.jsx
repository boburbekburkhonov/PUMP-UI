import React, { useEffect, useState } from 'react';
import { apiGlobal } from '../API/Api.global';
import './Login.css'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [checkRemember, setCheckRemember] = useState("off");

  useEffect(() => {
    if (
      window.localStorage.getItem("username") &&
      window.localStorage.getItem("password")
    ) {
      fetch(`${apiGlobal}/auth/signIn`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: window.localStorage.getItem("username"),
          password: window.localStorage.getItem("password"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.statusCode == 200) {
            window.localStorage.setItem("accessToken", data.data.accessToken);
            window.localStorage.setItem("refreshToken", data.data.refreshToken);
            if (data.data.user.role == "SUPERADMIN") {
              window.location.href = "/admin";
            } else if (data.data.user.role == "USER") {
              window.location.href = "/user";
            }
          }
        });
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    const { username, password } = e.target;

    const request = await fetch(`${apiGlobal}/auth/signIn`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const response = await request.json();

    if (response.statusCode == 200) {
      if (checkRemember == "on") {
        window.localStorage.setItem("username", username.value);
        window.localStorage.setItem("password", password.value);
      }
      window.localStorage.setItem("accessToken", response.data.accessToken);
      window.localStorage.setItem("refreshToken", response.data.refreshToken);
      if (response.data.user.role == "SUPERADMIN") {
        window.location.href = "/admin";
      } else if (response.data.user.role == "USER") {
        window.location.href = "/user";
      }
    } else {
      setError(true);
      setErrorMessage("Username yoki password noto'g'ri!");
    }

    username.value = "";
    password.value = "";
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center login-wrapper">
      <div className="container">
        <form action="" className="form_main m-auto" onSubmit={login}>
          <p className="heading">Nasos</p>
          <div className="inputContainer">
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="user"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
            </svg>
            <input
              type="text"
              className="inputField"
              id="username"
              name="username"
              placeholder="Username"
              required
            />
          </div>

          <div className="inputContainer mt-4">
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="lock"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 10-56 0z"></path>
            </svg>
            <input
              type="password"
              className="inputField"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>

          <div className="login-group-check mt-4">
            <input
              id="check"
              type="checkbox"
              onChange={() =>
                setCheckRemember(checkRemember == "off" ? "on" : "off")
              }
              className="check"
            />
            <label htmlFor="check" className="login-group-check-label">
              Eslab qolish
            </label>
          </div>

          <p className="error-message text-danger">
            {error ? errorMessage : ""}
          </p>

          <button
            id="button"
            className="d-flex align-items-center justify-content-around"
          >
            <span className="login-btn-span">Kirish</span>
            <svg
              className="text-primary"
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="arrow-right"
              fontWeight="bold"
              width="2em"
              height="20px"
              fill="rgb(0, 221, 61)"
              aria-hidden="true"
            >
              <path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;