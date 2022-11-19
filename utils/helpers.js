module.exports = {
    format_date: (date) => {
        return date.toLocaleDateString();
    },
    format_amount: (amount) => {
        return parseInt(amount).toLocaleString();
    },
    check_userId: (userId, reqId) => {
        if (userId === reqId) {
            return "true-user";
        } else {
            return "hidden";
        }
    }
};