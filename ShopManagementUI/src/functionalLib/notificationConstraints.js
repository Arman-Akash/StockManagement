import { NotificationManager } from 'react-notifications';
const duration = 4000;

export const createNotification = (type, message) => {
    if (type === 'info') {
        NotificationManager.info(message, 'Info', duration);
    } else if (type === 'success') {
        NotificationManager.success(message, 'Success', duration);
    } else if (type === 'warning') {
        NotificationManager.warning(message, 'Warning', duration);
    } else {
        NotificationManager.error(message, 'Error', duration);
    }
}

export const INFO = 'info';
export const SUCCESS = 'success';
export const WARNING = 'warning';
export const ERROR = 'error';