import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { apiError, apiLoading } from "../../actions/apiCreators";
import { logout_user } from "../../api/api";
import { RootState } from "../../interfaces";

export const Nav = () => {

    const active = ({ isActive }: { isActive: boolean }) => isActive ? "active" : "";
    const userId = localStorage.getItem('userId');
    const is_admin = localStorage.getItem('is_admin');
    const usernameSessionRef = useRef(localStorage.getItem('username'));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // используем redux чтобы перерендеривать компонент при изменении глобального state 
    const { username } = useSelector(
        (state: RootState) => state.api
      );

      useEffect(() => {
       // при изменении имени пользователя в компоненте будет обновляться
       if (username !== usernameSessionRef.current) {
        usernameSessionRef.current = username;
    }
}, [username]);

    // обнуляем ошибку для повторного входа
    const handleLink = async () => {  
        dispatch(apiError(null));
    }

    // если пользователь нажимает LogOut
    const logout = async () => {

        dispatch(apiLoading(true));
        try{
        const res = await logout_user();
        
        if (res.status !== 200) {
          console.log(res.message,'es.message')
          navigate('/api')
        }
        localStorage.clear();//sessionStorage.clear();
          // Перезагружаем страницу
          window.location.reload();
    } catch (error) {
        dispatch(apiError('Произошла ошибка. Повторите позднее.'))
    }
    finally {
        dispatch(apiLoading(false));
    }
      };

  return (
    <>
        <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mr-auto">

            <li className="nav-item">
                    <NavLink className={`nav-link ${active}`} to="/" onClick={handleLink}>
                        Главная
                    </NavLink>
                </li>
                {usernameSessionRef.current ? (
                    <>
                        <li className="nav-item">
                        <NavLink className="nav-link" to={`/storage/users/${userId}`}>{usernameSessionRef.current}</NavLink>
                        </li>

                        <li className="nav-item">
                        <div className="flex-row">
                            <a className="nav-link" onClick={logout}> Log out</a>
                            </div>
                        </li>
                    </>
                ) : (
                   <>
                    <li className="nav-item">
                        <NavLink className={`nav-link ${active}`} to="/register" onClick={handleLink}>
                            Зарегистрироваться
                        </NavLink>
                    </li>

                    <li className="nav-item">
                   
                        <NavLink className={`nav-link ${active}`}  to="/api" onClick={handleLink}>
                            Login
                        </NavLink>
                    </li>
                    </> 
                )}
                {is_admin && 
                <>
                <div className="nav-link_right">Вы вошли как Администратор</div>
                </>}
                
            </ul>
        </div>
    </>
    );

};