// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetch_storage_id } from "../../api/storage";
// import { Error } from "../Erorr";
// import { StoragePanel } from "../StoragePanel";
// import { apiError, apiLoading } from "../../actions/apiCreators";
// import { Files } from "../../interfaces";
// import { useNavigate } from "react-router-dom";


// export const Storage = () => {

//     const { error, loading, is_authenticated } = useSelector((state: any) => state.api);
   
//     const is_admin = localStorage.getItem('is_admin');//sessionStorage.getItem('is_admin');
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
 
//     const [ listFiles, setListFiles ] = useState<Files>([])

//     // Запрос списка файлов на диске при первом рендеренге если пользователь аутентифицирован
//     const userId = localStorage.getItem('userId');//sessionStorage.getItem('userId');

//     useEffect(() => {
//         const loadFiles = async () => {
//             try {
//                 dispatch(apiLoading(true));
//                 const res = await fetch_storage_id(userId || '');
//                 if (res.status != 200) {
//                     if ('error' in res) {
//                         dispatch(apiError(res.error));
//                         return;
//                     }
//                 }
//                 if (res.status == 200 && 'files' in res) {
        
//                         setListFiles(res.files);
//                 }
//                 dispatch(apiLoading(false));
//             } catch (err) {
//                 console.error('Error loading files:', err);
//                 dispatch(apiError(String(err)));
//             }
//         };
        
//         if (is_authenticated == true) {
//             loadFiles();
//         }
//     }, [dispatch, is_authenticated]);

//     return (
//  <>

// {!loading &&
// <> 
// {error && <Error/> }

   
// {!error &&  <>

// {is_authenticated == false &&

//         <>
//             <div className="alert alert-success" role="alert">
//                 <h4 className="alert-heading">Вы не авторизованы</h4>
//                 <hr/>
          
//             <p className="mb-0">
//                 <a href="/api">Войти</a>
//             </p>
//             </div>
//         </>
// }

// {is_authenticated == true &&

// <>
//     <div className="container-fluid mr-4 ml-4">
//             <>
//                 <div className="d-flex mt-3">

//                 </div>
//         <br/>


// {/* отобржение хранилища любого пользователя: */}
// {is_admin && 
// <>
//     <button
//     type="button"
//     className="btn btn-users btn-secondary me-2"
//     onClick={() => navigate('/storage/users')}>Список все пользователей
// </button><br/>

// </>}
// <br/>
// {listFiles && 
// <>
// < StoragePanel listFilesUser={listFiles}/>
// </>
// }
// </>
//     </div>
//     </>
// }
// </>
// }
// </>
// }

// {loading && 
// <>
// <div className="preloader">
//                  <span></span>
//                  <span></span>
//                  <span></span>
//                  <span></span>
// </div> 
// </>

// }
// </>

// )
// }
