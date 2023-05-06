import axios, * as others from 'axios';

function UserService() {
    const sv = {

        async sendEmailCode(userObj) {
            
            await axios.post(`http://localhost:5000/dev/code`, userObj)
        },

        async insertUser(user) {
            await axios.post(`http://localhost:5000/dev/insertUser`, user)
        },

        async setUserVerified(email) {
            const res = await axios.post(`http://localhost:5000/dev/verifyUser`,{
                queens_email: email
            })
            return res
        },

        async checkCode(code,email) {
            const res = await axios.post(`http://localhost:5000/dev/checkCode`,{
                user_code: code,
                queens_email: email
            })
            return res.data.codeStatus
        }
    }

    return sv
}

export default UserService