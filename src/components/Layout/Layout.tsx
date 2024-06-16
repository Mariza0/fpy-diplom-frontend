import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSession, get_csrf } from "../../api/api";
import { apiCsrf, apiError, apiIsAuthenticated } from "../../actions/apiCreators";

export const Layout = () => {

  const dispatch = useDispatch();

  const { csrf } = useSelector((state: any) => state.api);
  console.log(csrf,'csrf')

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await getSession();
        if (data.status === 200 && data) {
          localStorage.setItem("isAuthenticated", String(data.isAuthenticated));//sessionStorage.setItem("isAuthenticated", String(data.isAuthenticated));
          localStorage.setItem("username", data.username || "");//sessionStorage.setItem("username", data.username || "");
          localStorage.setItem('userId', data.userId || '');//sessionStorage.setItem('userId', data.userId || '');
          if (data.is_admin) {
            localStorage.setItem('is_admin', String(data.is_admin));//sessionStorage.setItem('is_admin', String(data.is_admin));
          }
          dispatch(apiIsAuthenticated(true));

          // Обнуляем ошибку соединения с сервером, если ранее была
          dispatch(apiError(null));
        } else {

          // Обнуляем CSRF-токен, если пользователь не авторизован
          dispatch(apiCsrf(""));
          localStorage.setItem("isAuthenticated", "false");//sessionStorage.setItem("isAuthenticated", "false");

          // Запрашиваем новый CSRF-токен для неавторизованного пользователя
          const csrf = await get_csrf() || '';
          console.log(csrf,'csrf в Layout')
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
