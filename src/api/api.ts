import { GetSessionResponse, RegisterResponse } from "../interfaces";

const server = import.meta.env.VITE_SERVER;

let csrfState = '';

const csrfToken = async () => {
  const csrf = csrfState;
  if (!csrf) {
      const newCsrfToken = await get_csrf();
      console.log(newCsrfToken,'newCsrfToken')
      return newCsrfToken;
  }
  return csrf;
};

// РЕГИСТРАЦИЯ пользователя
export const register_user = async (data: { username: string, 
                                            password: string, 
                                            full_name: string, 
                                            email: string, }, 
                                            csrf: string): Promise<RegisterResponse> => {
 
  const apiUrl = `${server}/users/register/`;

  try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "X-CSRFToken": csrf,
          },
          body: JSON.stringify(data),
          credentials: "include",

      });

      const responseData = await response.text();
      const res = JSON.parse(responseData);
      const csrfToken = res.csrf_token || '';
      csrfState = csrfToken;

      return {
        status: response.status,
        userId: res.id,
        username: res.username,
        csrfToken: csrfToken,
    };
    }
    catch (error) {
      return {
        message: error,
        status: 500,
      }
    }
};


// запрос на аутентификацию
// возвращает в случае аутентификации { isAuthenticated: data.isAuthenticated, username: data.username }
// в случае неудачной аутентификации возвращает {csrf: csrf}
// в случае ошибки возвращает {isAuthenticated: false, error: err}
export const getSession = async (): Promise<GetSessionResponse> => {
  const apiUrl = `${server}/api/session/`;
  try {
    const res = await fetch(apiUrl, {
      credentials: "include",
    });
    const data = await res.json();
    return data as GetSessionResponse;

  } catch(err) {
    console.log(err);
    return {isAuthenticated: false, message: 'Произошла ошибка. Повторите попытку соединения с сервером позднее.', 
    status: 403, username: '', userId: '', is_admin: false}
  }
}


//Если не аутентифицирован - получаем csrfToken
// возвращает csrfToken: string
export const get_csrf = async () => {
    const apiUrl = `${server}/api/csrf/`;
    try {
      const res = await fetch(apiUrl, {
      credentials: "include",
      });
      const csrfToken = res.headers.get("X-CSRFToken");
      return csrfToken;
    } catch (err) {
      console.log(err);
    }
  }

  // const isResponseOk = (response: { status: number; json: () => any; statusText: string | undefined; }) => {
  //   if (response.status >= 200 && response.status <= 299) {
  //     return response.json();
  //   } else {
  //     throw Error(response.statusText);
  //   }
  // }

  // LOGIN user
  // в случае если пользователь не авторизован, отправляем логин/пароль
  export const login = async ( data: { username: string, password: string, csrfToken: string  }) => {

    const csrfToken = data.csrfToken;
    console.log(csrfToken,'csrfToken')

    try {
      const response = await fetch(`${server}/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({username: data.username, password: data.password}),
    })

    const res = await response.json();
      return res

    } catch (error) {
        console.error('Error:', error);
    }
};

// запрос списка пользователей для администратора
export const fetch_users = async () => {

  const csrf = await csrfToken() || '';

  try {
    const response = await fetch(`${server}/users/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrf,
    },
    credentials: "include",
  })

  const responseData = await response.text();
  const result = await JSON.parse(responseData);

  console.log(result,'result')
  return result;

  } catch (error) {
      console.error('Error:', error);
      return {
        message: "Ошибка сервера",
        status: 500
      }
  }
};

// запрос данных профиля
export const fetch_user_data = async (user_id: string) => {

  const csrf = await csrfToken() || '';

  try {
    const response = await fetch(`${server}/users/${Number(user_id)}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrf,
    },
    credentials: "include",
  })

  const responseData = await response.text();
  const result = await JSON.parse(responseData);

  console.log(result,'result')
  return result;

  } catch (error) {
      console.error('Error:', error);
      return {
        message: "Ошибка сервера",
        status: 500
      }
  }
};


// CHANGE user
export const fetch_change_user = async (userId: string, data: { username?:string, full_name?: string, email?: string }) => {

  const { username, email, full_name } = data;
  console.log(userId,'userId')

  const formData = new FormData();

  if (username) formData.append('username', username);
  if (email) formData.append('email', email);
  if (full_name) formData.append('full_name', full_name);

  const apiUrl = `${server}/users/change/${Number(userId)}/`;
  const csrf = await csrfToken() || '';

  try {
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      body: formData,
      headers: {
        "X-CSRFToken": csrf,
      },
      credentials: 'include'
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update user.');
    }

    return {status: response.status};

  } catch (error) {
    console.error('Error updating user:', error);
    return {
      message: error,
      status: 500
    }
  }
};

// CHANGE status admin  у пользователя
export const fetch_change_status = async (userId: string, statusAdmin: string) => {


  const formData = new FormData();
  formData.append('statusAdmin', statusAdmin)

  const apiUrl = `${server}/users/changestatusadmin/${Number(userId)}/`;
  const csrf = await csrfToken() || '';
  try {
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      body: formData,
      headers: {
        "X-CSRFToken": csrf,
      },
      credentials: 'include'
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update user.');
    }

    console.log(response.json())
    return {status: response.status};

  } catch (error) {
    console.error('Error updating user:', error);
    return {
      message: error,
      status: 500
    }
  }
};


export const logout_user = async () => {

  try {
      const response = await fetch(`${server}/api/logout/`, {
      credentials: "include" });
      const responseData = await response.json();
      return responseData;

  } catch (error) {
    return {
      message: error,
      status: 500
    }
  }
};
