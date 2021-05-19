//Đối tượng `Validator`
function Validator(options){
    
    let selectorRules = {};
    //hàm thực hiện validate
    function validate(inputElement, rule){
        let errorMessage;
        let errorElemnt = inputElement.parentElement.querySelector(options.errorSelector);
        
        //Lấy ra các rules
        let rules = selectorRules[rule.selector];

        //Lặp qua từng rule và kiểm tra
        for(let i = 0; i < rules.length ; ++i){
            errorMessage = rules[i](inputElement.value);
            if(errorMessage) break;
        }

        if(errorMessage){
            errorElemnt.innerText = errorMessage;
            inputElement.parentElement.querySelector('input').style.border = '1px solid red';
            inputElement.parentElement.querySelector('span').style.color = 'red';
        }else{
            errorElemnt.innerText = '';
            inputElement.parentElement.querySelector('input').style.border = '1px solid gray';
        }

        return !errorMessage;
        
    }

    //lấy element của form cần validate
    let formElement = document.querySelector(options.form);
    //console.log(formElement);
    if(formElement){

        // Khi submit form hủy sự kiện
        // Đăng ký
        formElement.onsubmit = function(e){
            e.preventDefault();
            
            let isFormSucess = true;

            //Lặp qua các rules và validate
            options.rules.forEach(function(rule){
                let inputElement = formElement.querySelector(rule.selector);
                let isSucess = validate(inputElement, rule);

                if(!isSucess){
                    isFormSucess = false;
                }
            });

            if(isFormSucess){
                let enableInputs = formElement.querySelectorAll('[name]');

                let formValues = Array.from(enableInputs).reduce(function(values, input){
                    return (values[input.name] = input.value) && values; 
                },{});

                options.onSubmit(formValues);
                alert('Đăng ký thành công');
                window.location = "../../index.html";

            }
            
        }

        //Đăng nhập
        formElement.onsubmit1 = function(e){
            e.preventDefault();
            
            //Lặp qua các rules và validate
            options.rules.forEach(function(rule){
                let inputElement = formElement.querySelector(rule.selector);
                validate(inputElement, rule);
            });
            
        }
        
        //Lặp qua các rule và xử lý sự kiện blur, input
        options.rules.forEach((rule) => {
            
            //Lưu lại các rule cho input
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            }else{
                selectorRules[rule.selector] = [rule.test];
            }

            let inputElement = formElement.querySelector(rule.selector);
            
            if(inputElement){
                //Xử lý trường hợp blur khỏi input
                inputElement.onblur = function(){
                    //value: inputElement.value
                    //test func: rule.test
                    validate(inputElement,rule);
                }

                //Xử lý trường hợp khi người dùng nhập input
                inputElement.oninput = function(){
                    let errorElemnt = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElemnt.innerText = '';
                    inputElement.parentElement.querySelector('input').style.border = '1px solid gray';
                }
            }

        });
    }
}

//Định nghĩa rules
/**Nguyên tắc của rules:
 * 1. Khi có lỗi => mess lỗi
 * 2. Khi hợp lệ => Không trả ra cái gì cả(undefined)
*/
Validator.isRequired = function(selector){
    return{
        selector:selector,
        test: function(value){
            return value.trim() ? undefined : 'Vui lòng nhập trường này';
        }
    };
}

Validator.isEmail = function(selector){
    return{
        selector:selector,
        test: function(value){
            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            return regex.test(value) ? undefined : 'Trường này phải là email';
        }
    };
}

Validator.minLenght = function(selector, min){
    return{
        selector:selector,
        test: function(value){
            return value.length >= min ? undefined : `Mật khẩu tối thiểu ${min} kí tự`;
        }
    };
}

Validator.isConfirmed = function(selector, getPassword){
    return{
        selector: selector,
        test: function(value){
            return value === getPassword() ? undefined : 'Giá trị nhập vào không chính xác';
        }
    }
}