import React, {FC} from 'react';
interface SuccessProps {
    count: number;
}
export const Success: FC<SuccessProps> = ({count}) => {
    return (
        <div className="success-block">
            <img src="/assets/success.svg" alt="Success"/>
            <h3>Successful!</h3>
            <p>{count} users have been sent an invite.</p>
            <button onClick={()=>window.location.reload()} className="send-invite-btn">Back</button>
        </div>
    );
};