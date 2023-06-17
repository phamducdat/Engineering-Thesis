import moment from "moment";

export const DP_formatDate = (value: number) => {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
}