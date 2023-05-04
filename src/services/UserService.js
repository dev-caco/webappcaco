import axios, * as others from 'axios';

function UserService() {
    const sv = {

        async sendEmailCode(userObj) {
            const res = await axios.post(`http://localhost:5000/dev/code`, userObj)
            return res
        },

        async insertUser(user) {
            const res = await axios.post(`http://localhost:5000/dev/insertUser`, user)
            return res
        }
    }

    return sv
}

export default UserService