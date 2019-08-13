一、正则表达式密码

大写字母 小写字母 数字 特殊字符（四种里至少三种）

第一种：
/((^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{8,16}$)|(^(?=.*\d)(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{8,16}$)|(^(?=.*\d)(?=.*[a-z])(?=.*\W)[\da-zA-Z\W]{8,16}$)|(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\da-zA-Z\W]{8,16}$))/

第二种：
/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/


三种
1、密码中必须包含大小字母、数字、特殊字符，至少8个字符，最多16个字符
/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,14}/

2、密码中必须包含字母（不区分大小写）、数字、特称字符，至少8个字符，最多16个字符
/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}/

3、密码中必须包含字母、数字，至少8个字符，最多16个字符。
/(?=.*[0-9])(?=.*[a-zA-Z]).{8,16}/

两种

1、密码是数字和字母 8-16位
/[a-zA-Z]+(?=[0-9]+){8,16}|[0-9]+(?=[a-zA-Z]+){8,16}/
