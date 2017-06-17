import Moment from 'moment'

export default {
  dateConvert (time) {
    return time && Moment(time).format('YYYY-MM-DD HH:mm:ss')
  },
  dayConvert (time) {
    return time && Moment(time).format('YYYY-MM-DD')
  }
}

