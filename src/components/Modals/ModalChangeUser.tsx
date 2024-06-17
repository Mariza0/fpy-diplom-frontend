import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetch_change_user } from "../../api/api";
import { ModalChangeUserProps } from "../../interfaces";
import { apiError } from "../../actions/apiCreators";

export const ModalChangeUser: React.FC<ModalChangeUserProps> = ({ isModalChangeUser, data, onClose }) => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    // Инициализация состояния формы и начальных данных с пустыми значениями
    const [formData, setFormData] = useState({
        username: '',
        full_name: '',
        email: '',
    });
    const [initialData, setInitialData] = useState({
        username: '',
        full_name: '',
        email: '',
    });

    useEffect(() => {
        if (data) {
            setFormData(data);
            setInitialData(data);
        }
    }, [data]);

    if (!data) {
        return null;
      }

    const userId = data.id

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target;
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
          }));
            
      };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()

        // Сравнение данных формы с первоначальными данными
        if (JSON.stringify(formData) === JSON.stringify(initialData)) {
            console.log("No changes detected, not sending request");
            onClose()
            return; // если данные не изменились, не отправляем запрос
        }

        const { username, full_name, email } = formData;
       
        const dataToSend = {
            username: username,
            full_name: full_name,
            email: email,
        }

        try{

            const res = await fetch_change_user(userId, dataToSend)
            setLoading(true)
            const status = res.status
                if (status >= 200 && status < 300 ) {
                    // обновляем имя пользователя в Nav
                    window.location.reload();
                    setLoading(false);
                }
                else {
                    dispatch(apiError("Ошибка. Повторите попытку позднее "))
                }
        
        console.log(res)
        onClose()

    } catch(err) {
        console.log(err)
    }

    }

    return (
        <>
        {loading &&
        <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
       </div> 
        }
        {isModalChangeUser &&
            <form onSubmit={handleSubmit}>
                <div className="modal fade show" style={{ display: "block" }} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header_change_comment">
                                <div className="change-comment_close mt-2">
                                    <h2 className="modal-title fs-4 ms-3" id="exampleModalLabel">Изменение данных</h2>
                                    <button type="button" className="btn-close me-3" onClick={onClose} aria-label="Close"></button>
                                </div>

                    <div className="form-group">
                        <label htmlFor="login">Логин</label>
                    <input type="login" className="form-control" 
                        id="username" 
                        name="username"
                        value={formData.username}
                      
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

                    <div className="modal-footer">
                        <button type="submit" className="btn btn-modal ms-3">Изменить</button>
                    </div>    
                </div>
            </div>
        </div>
    </div>
</form>
          
}
</>
    )
}