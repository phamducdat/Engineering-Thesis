export const convertWarningMessage = (from: string) => {
    switch (from) {
        case 'User exists with same username or email':
            return 'Đã tồn tại Tên tài khoản hoặc Email';
        case 'User exists with same username':
            return 'Đã tồn tại Tên tài khoản'
        case 'User exists with same email':
            return 'Đã tồn tại Email'
        default:
            return from;
    }
}