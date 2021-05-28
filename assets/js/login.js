$(function () {
    // 点击 去注册账号 链接
    $(".login-box").on("click",function() {
        $(".loginBox").hide()
        $(".regBox").show()
    }) 

    // 点击 去登录链接
    $(".reg-box").on("click",function() {
        $(".regBox").hide()
        $(".loginBox").show()
    }) 


    // 密码框校验规则
    // 从 layui 获取 form
    var form = layui.form
    var layer = layui.layer 
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],

        // 校验两次密码是否一致
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 进行一次是否相等的判断
            // 如果判断错误，return一个提示消息
            var pwd = $(".regBox [name= password]").val()
            if (pwd !== value) {
                return "两次输入的密码不一致"
            }
        }
    })


    // 监听注册表单的提交事件
    $("#form_reg").on("submit", function(e) {
        // 先阻止默认提交事件
        e.preventDefault()
        var data = {
            username: $("#form_reg [name=username]").val(), 
            password: $("#form_reg [name=password]").val()
        }
        // 发起 ajax 的 post 请求
        $.post("api/reguser",data,function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg("注册成功,请登录")
            // 模仿点击事件
            $(".reg-box").click()
        })
    })


    // 监听登录表单的提交事件
    $("#form-login").submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: "/api/login",
            method: "POST",
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("登陆失败!")
                    // return console.log("登陆失败!");
                }
                layer.msg("登陆成功!")
                // 将登陆成功等到的 token 字符串，保存到 localStorage 中
                localStorage.setItem("token",res.token)

                console.log(res.token);
                // 跳转到后台主页面
                location.href = "/index.html"
            }
        })
    })
})