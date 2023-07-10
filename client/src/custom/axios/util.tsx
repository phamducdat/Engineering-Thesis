export const convertWarningMessage = (from: string) => {
    switch (from) {
        case 'User exists with same username or email':
            return 'Đã tồn tại username hoặc email';
        case 'User exists with same username':
            return 'Đã tồn tại username'
        case 'User exists with same email':
            return 'Đã tồn tại email'
        default:
            return from;
    }
}