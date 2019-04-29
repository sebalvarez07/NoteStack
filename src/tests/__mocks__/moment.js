// import moment from 'moment';
const moment = require.requireActual('moment');

export default (timestamp = 0) => {
    // Makes default moment equal to 0 (1970) instead of moment() = current moment (now)
    return moment(timestamp);
};