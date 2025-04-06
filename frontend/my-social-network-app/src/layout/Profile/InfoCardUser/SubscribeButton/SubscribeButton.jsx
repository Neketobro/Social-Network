import { Button } from "@mui/material";
import { selectUserLoginStatus, USER_ADD_SUBSCRIBERS, USER_DELETE_SUBSCRIBERS } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export function SubscribeButton({ isUser, user }) {
    const dispatch = useDispatch();
    const userLoginStatus = useSelector(selectUserLoginStatus)
    const [loading, setLoading] = useState(false);
    const isSubscribers = Array.isArray(isUser?.subscribers) && isUser.subscribers.includes(user.id);

    useEffect(() => {
        if (userLoginStatus === 'loading') {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [userLoginStatus])

    function addSubscribersHandler() {
        const data = {
            userId: isUser.id,
            subscriber: { subscriberId: user.id }
        };

        dispatch(USER_ADD_SUBSCRIBERS(data));
    }

    function deleteSubscribersHandler() {
        const data = {
            userId: isUser.id,
            subscriber: { currentUserId: user.id }
        };

        dispatch(USER_DELETE_SUBSCRIBERS(data));
    }

    if (isUser.id === user.id) return;
    return (
        <>
            {isSubscribers ? (
                <Button variant='outlined' loading={loading} onClick={deleteSubscribersHandler} sx={{ marginBlock: 5 }}>
                    Unsubscribe
                </Button>
            ) : (
                <Button variant='contained' loading={loading} onClick={addSubscribersHandler} sx={{ marginBlock: 5 }}>
                    Subscribe
                </Button>
            )}
        </>
    )
}