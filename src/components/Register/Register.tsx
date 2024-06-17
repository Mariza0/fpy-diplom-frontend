import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register_user } from "../../api/api";
import { apiError, apiIsAuthenticated } from "../../actions/apiCreators";
import { RootState } from "../../interfaces";

export const Register = () => {

    const { csrf, error } = useSelector(
        (state: RootState) => state.api
      );

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        password: '',
        password2: '',
        login: '',
        full_name: '',
        email: '',

     });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target;
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
          }));
            
      };
     
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        const password = formData.password;
        const password2 = formData.password2;

        if (password !== password2) {
            alert('Пароли не совпадают');
            return;
        }

        const login = formData.login;
        const full_name = formData.full_name;
        const email = formData.email;

        const data = {
            username: login,
            password: password,
            full_name: full_name,
            email: email,
        };

        // Отправляем запрос на сервер
        setLoading(true);
        try {
            const res = await register_user(data, csrf);
            if (res.status == 201) {
                
                localStorage.setItem('isAuthenticated', 'true');//sessionStorage.setItem('isAuthenticated', 'true');
                if ('username' in res) {
                localStorage.setItem('username', res.username);//sessionStorage.setItem('username', res.username);
                localStorage.setItem('userId', res.userId);//sessionStorage.setItem('userId', res.userId);
                dispatch(apiIsAuthenticated(true));
                navigate(`/storage/users/${res.userId}`);
                }

            } else {
                dispatch(apiError("Ошибка регистрации. Повторите попытку позднее"));
            }
        } catch (err) {
            console.log(err);
            dispatch(apiError("Ошибка регистрации. Повторите попытку позднее"));
        } finally {
            setLoading(false);
        }
}

return (
<>

    {!loading && error &&
        <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Error</h4>
            <hr/>
            <p>{error}</p>
            <p className="mb-0">
                <a href="/register.html">Вернуться</a>
            </p>
        </div>

        }

        {loading && 
        <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
       </div>  

        }

        {!loading &&

            <div className="container-form">

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="login">Логин</label>
                    <input type="login" className="form-control" 
                        id="login" 
                        name="login"
                        value={formData.login}
                      
                        onChange={handleChange}
                        required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="full_name">Полное имя</label>
                        <input type="text" className="form-control" 
                        id="full_name" 
                        name="full_name"
                        value={formData.full_name}
                  
                        onChange={handleChange}
                        required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="full_name">Email</label>
                        <input type="email" className="form-control" 
                        id="email" 
                        name="email"
                        value={formData.email}
                  
                        onChange={handleChange}
                        required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input type="password" className="form-control" 
                        id="password" 
                        name="password"
                        value={formData.password}
                    
                        onChange={handleChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password2">Повторите пароль</label>
                        <input type="password" className="form-control" 
                        id="password2" 
                        name="password2"
                        value={formData.password2}
                     
                        onChange={handleChange}
                        required/>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>

                </form>

            </div>
            }
        </>
    )
}
