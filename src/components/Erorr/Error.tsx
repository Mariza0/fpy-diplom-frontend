import { useSelector } from "react-redux";

export const Error = () => {

    const { error } = useSelector(
        (state: any) => state.api
      );

    return (
        <>
            <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Error</h4>
                <hr/>
                <p>{error}</p>
            </div>
 
        </>
    )
};
