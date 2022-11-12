const req = require('axios')

const baseapi = "https://lyc.troshhost.fr"
/// 1 : Paid version
/// 2 : Free version
/// 3 : Not found
/// 4 : Server not found

async function checkLicense2(licensecode) {
     return req.get(`${baseapi}/licenses.php?key=${licensecode}`)
      .then(res => {
        if (res.status == 200) {
            return 1
        } else {
            return 2
        }
      })
      .catch(err => {
        if (err.message.includes("404")) {
            return 3
        } else if (err.message.includes("ENOTFOUND")) {

            return 4
        }
        else {
            return err.message
        }
      });
    }

module.exports = {
    checkLicense: async (licensecode) => {
        return checkLicense2(licensecode)
    }
}