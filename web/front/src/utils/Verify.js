const regs = {
  email: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
  phone: /^1[3-9]\d{9}$/,
  password: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&~_])[A-Za-z\d@$!%*?&~_]{8,18}$/,
  studentId: /^\d{10}$/,
};
const verify = (rule, value, reg, callback) => {
  if (value) {
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error(rule));
    }
  } else {
    callback();
  }
};
export default {
  email: (rule, value, callback) => {
    return verify(rule, value, regs.email, callback);
  },
  phone: (rule, value, callback) => {
    return verify(rule, value, regs.phone, callback);
  },
  studentId: (rule, value, callback) => {
    return verify(rule, value, regs.studentId, callback);
  },
  password: (rule, value, callback) => {
    return verify(rule, value, regs.password, callback);
  },
};
