import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiError, apiIsAuthenticated } from "../../actions/apiCreators";
import { Error } from "../Erorr"
import { login } from "../../api/api";

export const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, csrf, loading } = useSelector(
    (state: any) => state.api
  );
  const userId = localStorage.getItem('userId');//sessionStorage.getItem('userId');
  const is_authenticated = localStorage.getItem('isAuthenticated');//sessionStorage.getItem('isAuthenticated');

  useEffect(() => {
    if (is_authenticated == 'true') {
      navigate(`/storage/users/${userId}`);
    }
  }, [is_authenticated, navigate]);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  // отправка логин пароля на сервер
  const login_user = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      
      //достаем csrf token из глоб состояния
      const csrfToken = csrf;
      const res = await login({username, password, csrfToken});
      console.log(res)
      if (res.status == 200) {  

        if ('userId' in res) {
          localStorage.setItem('userId', res.userId);//sessionStorage.setItem('userId', res.userId);
          localStorage.setItem('isAuthenticated', 'true');//sessionStorage.setItem('isAuthenticated', 'true');

        }
        if ('is_admin' in res) {
          if (res.is_admin == true) {
            localStorage.setItem('is_admin', 'true');//sessionStorage.setItem('is_admin', 'true');
          }
        }
        if ('username' in res) {
          localStorage.setItem('username', res.username);//sessionStorage.setItem('username', res.username);
        }
        dispatch(apiIsAuthenticated(true))
    
        // обнуляем ошибку соединения с сервером если ранее была
        dispatch(apiError(null))
        navigate("storage");
    }
    else {
      const error = String(res.message);
      dispatch(apiError(error))
    }
   } catch (err) {
      console.log(err);
      dispatch(apiError(String(err)))
    }
  };

  if (error) return  (
    <>
      <Error/>
    </>
  );

  return (
    <>
    {loading &&
    <>
    <div className="preloader">
                 <span></span>
                 <span></span>
                 <span></span>
                 <span></span>
    </div> 
    </>
    }
      <div className="container mt-3">
        <br />
        <br />
        <form onSubmit={login_user}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" name="username" value={username} onChange={handleUserNameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={password} onChange={handlePasswordChange} />
            <div>
              {error && <small className="text-danger">{error}</small>}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Войти</button>
        </form>
      </div>
    </>
    );
};
