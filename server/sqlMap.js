// sql语句
var sqlMap = {
    //用户
    user: {
        add: 'INSERT INTO public.user(id, name, "userType", remark, "aliseName") VALUES ($1,$2,$3,$4,$5)',
        select:'SELECT id, name, "userType", remark, "aliseName" FROM public.user',
    }
}
module.exports = sqlMap;