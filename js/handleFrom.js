function validator(options){
    // function thông báo lỗi và gán vào thẻ có class mess-err
    // rule.test() return undefine nếu có giá trị đúng
    function validate(inputElement,rule){
        if(inputElement){
                var errMess = rule.test(inputElement.value);
                if(errMess){
                    inputElement.parentElement.querySelector(".mess-err").innerText = errMess;
                    inputElement.parentElement.classList.add("color-err");
                }
                else {
                    inputElement.parentElement.querySelector(".mess-err").innerText=""
                    inputElement.parentElement.classList.remove("color-err")
                }
                return errMess;
        }
    }
    // xử lý khi trang submit thành công
    
    var formElement = document.querySelector(options.form);
    formElement.onsubmit = function (e){
        var isAllow = true;
        options.rules.forEach(function(rule){
            var inputElement = formElement.querySelector(rule.selector);
            if(validate(inputElement,rule))
                isAllow = false;
                
        });
        console.log(isAllow);
        return isAllow;
    }
    
    if(formElement){
        options.rules.forEach(function(rule){
            var inputElement = formElement.querySelector(rule.selector);
            if(inputElement){
                // xử lý khi blur
                inputElement.onblur = function(){
                    validate(inputElement,rule);
                    inputElement.classList.remove("box-shadow");
                }
                // sử lý khi người dùng đang nhập
                inputElement.oninput = function (){
                    inputElement.classList.add("box-shadow");
                    inputElement.parentElement.querySelector(".mess-err").innerText = "";
                    inputElement.parentElement.classList.remove("color-err");

                }
            }
            
        })
    }
}
// kiểm tra có nhập hay chưa
validator.isRequired = function(selector){
    return{
        selector:selector,
        test: function (value){
            return value.trim() ? undefined:"không được để trống";
        }
    }
}
// kiểm tra email nhập vào có phải là ou hay không
validator.isEmailOu = function(selector){
    const emailOu = "@ou.edu.vn";
    return{
        selector:selector,
        test: function(value){
            var checkOu = value.trim().substr(value.length-emailOu.length,emailOu.length) == emailOu;
            if(checkOu && value.length > emailOu.length)
                return undefined;
            else
                return "Không phải email Ou";
        }
    }

}
// kiểm tra đã chọn khoa hay chưa
validator.checkKhoa= function(selector){
    return{
        selector:selector,
        test: function(value){
            return value != "Chọn khoa của bạn" ? undefined:"Bạn chưa chọn Khoa"
    }

    }
}