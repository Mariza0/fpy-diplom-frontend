import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSession, get_csrf } from "../../api/api";
import { apiCsrf, apiError, apiIsAuthenticated } from "../../actions/apiCreators";


export const Layout = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSession = async () => {
      console.log('запрос сессии из layOut')
      try {
        const data = await getSession();
        if (data.status === 200 && data) {
          localStorage.setItem("isAuthenticated", String(data.isAuthenticated));
          localStorage.setItem("username", data.username || "");
          localStorage.setItem('userId', data.userId || '');
          if (data.is_admin) {
            localStorage.setItem('is_admin', String(data.is_admin));
          }
          dispatch(apiIsAuthenticated(true));

          // Обнуляем ошибку соединения с сервером, если ранее была
          dispatch(apiError(null));
        } else {

          // Обнуляем CSRF-токен, если пользователь не авторизован
          dispatch(apiCsrf(""));
          localStorage.setItem("isAuthenticated", "false");

          // Запрашиваем новый CSRF-токен для неавторизованного пользователя
          const csrf = await get_csrf() || '';
          dispatch(apiCsrf(csrf));
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        dispatch(apiCsrf(""));
      }
    };
    fetchSession();
  }, [dispatch]);

  return (
   <>
      <Header />
        <main className="container-max-widths mb-5">
          <Outlet />
        </main>
    </>
  );
};
