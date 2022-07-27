import store from "../store";
import axios from "axios";
import {clearCurrentUser} from "../store/actions/user";



export const authHeader = () => {

    const {user} = store.getState();
    const currentUser = user;
    return {
        'Content-Type': 'application/json',
        'authorization': `Bearer  ${currentUser?.token}`,
    };

};

export function handleResponseWithLoginCheck() {
    axios.interceptors.response.use(

        response => response,
        error => {
            const currentUser = store.getState().user;
            const isLoggedIn = currentUser?.token;
            const status = error?.response.status;

            if (isLoggedIn && [401, 403].includes(status)) {
                store.dispatch(clearCurrentUser());
                // eslint-disable-next-line no-restricted-globals
                history.push('/login');
            }

            return Promise.reject(error);
        }
    );
};