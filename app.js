const form = document.querySelector('form')

const validateUsername = (usernameValue) => {
  const nameRegex = /^[A-Za-z ]{5,15}$/
  if (!usernameValue) {
    return 'Campo obrigatório'
  } else if (/\d/.test(usernameValue)) {
    return 'Digite apenas letras'
  } else if (!nameRegex.test(usernameValue)) {
    return 'Nome deve conter entre 5 e 15 letras'
  }
  return null
}

const validateEmail = (emailValue) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z]{3,})+$/i
  if (!emailValue) {
    return 'Campo obrigatório'
  } else if (!emailRegex.test(emailValue)) {
    return 'Email inválido'
  }
  return null
}

const validatePassword = (passwordValue) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/
  if (!passwordValue) {
    return 'Campo obrigatório'
  } else if (!passwordRegex.test(passwordValue)) {
    return 'A senha deve ter no mínimo 6 dígitos e conter pelo menos um número'
  }
  return null
}

const validateConfirmPassword = (confirmPasswordValue, passwordValue) => {
  if (!confirmPasswordValue) {
    return 'Campo obrigatório'
  } else if (confirmPasswordValue !== passwordValue) {
    return 'As senhas não são iguais'
  }
  return null
}

const formSent = () =>{
    form.nextElementSibling.classList.remove('hidden')
    console.log('enviou')
    form.setAttribute('class', 'hidden')
}


function setFieldValidation(section, errorMessage) {
    const fieldSection = section.closest('section')
    if (errorMessage) {
        fieldSection.setAttribute('class', 'error')
        fieldSection.lastElementChild.textContent = errorMessage
    } else {
        fieldSection.setAttribute('class', 'success')
        fieldSection.lastElementChild.textContent = ''
    }
}

const inputNameLength = (inputName, maxLength) => {
    const inputValue = inputName.value
    if (inputValue.length >= maxLength) {
      inputName.value = inputValue.slice(0, maxLength)
    }
  }

const inputEmailLength = (inputEmail, maxLength) => {
    const inputValue = inputEmail.value 
    if(inputValue.length >= maxLength){
        inputEmail.value = inputValue.slice(0, maxLength)
    }
}

const inputPasswordLength = (inputPassword, maxLength) =>{
    const inputPasswordValue = inputPassword.value 
    if(inputPasswordValue.length >= maxLength){
        inputPassword.value = inputPasswordValue.slice(0, maxLength)
    }
}

form.addEventListener('submit', (event) => {
      event.preventDefault()
      const { username, email, password, confirmPassword } = event.target
    
      const usernameValue = username.value.trim()
      const emailValue = email.value.trim()
      const passwordValue = password.value.trim()
      const confirmPasswordValue = confirmPassword.value.trim()
    
      const usernameError = validateUsername(usernameValue)
      const emailError = validateEmail(emailValue)
      const passwordError = validatePassword(passwordValue)
      const confirmPasswordError = validateConfirmPassword(confirmPasswordValue, passwordValue)
    
      setFieldValidation(username, usernameError)
      setFieldValidation(email, emailError)
      setFieldValidation(password, passwordError)
      setFieldValidation(confirmPassword, confirmPasswordError)
    
      if (!usernameError && !emailError && !passwordError && !confirmPasswordError) {
        form.submit()
        formSent()
      }
    })

form.addEventListener('input', event =>{
    const clickedElement = event.target
    if(clickedElement === username){
        inputNameLength(clickedElement, 15)
    }

    if(clickedElement === email){
        inputEmailLength(clickedElement, 40)
    }

    if(clickedElement === password || clickedElement === confirmPassword){
        inputPasswordLength(clickedElement, 20)
    } 
})

