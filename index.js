const formContainer = document.querySelectorAll(".form-container")
const button = document.querySelectorAll("button")
const form = document.querySelectorAll("form")
const nameDiv = document.querySelector(".name")
const emailDiv = document.querySelector(".email-addrees")
const phoneNumberDiv = document.querySelector(".phone-number")
const inputsField = document.querySelectorAll(".inputs")
const inputText = document.querySelector("[type=text]")
const inputEmail = document.querySelector("[type=email]")
const inputTelephone = document.querySelector("[type=tel]")
const card = document.querySelectorAll(".card")
const btnToggle = document.querySelector(".toggle-dtn")
const montly = document.querySelector(".monthly")
const year = document.querySelector(".yearly")
const price = document.querySelectorAll(".price")
const twoMonthFree = document.querySelectorAll(".two-month-free")
const profileChecked = document.querySelector(".profile-check")
const yearlyPlan = [90, 120, 150]
const montlyPlan = [9, 12, 15]
const addOnsMo = ["+$1/mo", "+$2/mo", "+$2/mo"]
const addOnsYr = ["+$10/yr", "+$20/yr", "+$20/yr"]
let flag = false
const userCerdentails = {
    info: {
        name: "",
        email: "",
        phnNumber: ""
    },
    plan: {
        planName: "",
        planSubscription: "Montly",
        planPrice: "",
    },
    addOns: {
        onlineService: {
            title: "Online service",
            price: 1
        },
        largeStorage: {
            title: "Larger storage",
            price: 2
        },
        customizablePrice: {
            title: "",
            price: ""
        }
    }
}
const emailRegex = /[A-Za-z0-9]+@/
let checkedIndex = 0;
// const errorMessage = document.querySelector("[class=error-message]")
const inputArray = []
const divArray = []
inputArray.push(inputText)
inputArray.push(inputEmail)
inputArray.push(inputTelephone)
divArray.push(nameDiv)
divArray.push(emailDiv)
divArray.push(phoneNumberDiv)
let counter = 0;

formContainer.forEach((nextStep, index) => {
    nextStep.style.left = `${index * 100}%`
})
//

// 
inputsField.forEach(input => {
    input.addEventListener("input", (e) => {
        let idAttritude = e.target.id
        let value = e.target.value
        ///\D/g -> A global search for non-digit characters
        let replaceCharacterToEmptyString = value.replace(/\D/g, "")
        // console.log(replaceCharacterToEmptyString)
        switch (idAttritude) {
            case "name":
                validateInput(value, 0)
                break;
            case "email":
                validateInput(value, 1)
                break;
            case "phone":
                if (value.length < 10) {
                    input.setAttribute("value", replaceCharacterToEmptyString)
                    input.value = replaceCharacterToEmptyString
                }
                validateInput(replaceCharacterToEmptyString, 2)
                break;
            default: break;
        }
    })
})
// validateInput function for reusable of the code
const validateInput = (value, index) => {
    if (!value) {
        inputArray[index].classList.add("active")
        divArray[index].children[0].children[1].classList.add("active")
    } else {
        inputArray[index].classList.remove("active")
        divArray[index].children[0].children[1].classList.remove("active")
    }


}
// button for nextStep using switch case validating particular component
button.forEach((btn, index) => {
    btn.addEventListener("click", e => {
        e.preventDefault()
        let name = inputText.value
        let email = inputEmail.value
        let phoneNumber = inputTelephone.value
        let prograssiveName = btn.closest("form").className
        let emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}/
        if (e.target.ariaLabel === "next-step" || e.target.ariaLabel === "confirm") {
            switch (prograssiveName) {
                case "personal-info":
                    if (name != "" && email != "" && phoneNumber.length === 10) {
                        if (emailPattern.test(email)) {
                            Object.keys(userCerdentails.info).forEach((key, index) => {
                                userCerdentails.info[key] = inputsField[index].value.trim()
                            })
                            counter++;
                            slideForm()
                        } else {
                            alert("Email address is not correctly format")
                        }

                    } else {
                        if (!name && !email && !phoneNumber) {
                            for (let i = 0; i < inputsField.length; i++) {
                                inputsField[i].classList.add("active")
                                divArray[i].children[0].children[1].classList.add("active")
                            }
                        } else {
                            if (!name) {
                                validateInput(name, 0)
                            } if (!email) {
                                validateInput(email, 1)
                            } if (!phoneNumber) {
                                validateInput(phoneNumber, 2)
                            }
                        }
                    }

                    break;

                case "select-plan":
                    let subscription = document.querySelector(".selected-card").querySelectorAll(".arcade-content")[0];
                    userCerdentails.plan.planName = subscription.children[0].innerText
                    userCerdentails.plan.planPrice = subscription.children[1].ariaLabel
                    userCerdentails.plan.planSubscription = btnToggle.ariaLabel
                    counter++;
                    slideForm()
                    break;
                case "add-ons":
                    if (profileChecked.checked) {
                        userCerdentails.addOns.customizablePrice.title = "Customizable Profile"
                        userCerdentails.addOns.customizablePrice.price = "2"
                    }
                    let totalAmount = 0;
                    // userCerdentails.addOns.onlineService.price = flag ? userCerdentails.addOns.onlineService.price * 10 : userCerdentails.addOns.onlineService.price;
                    // userCerdentails.addOns.largeStorage.price = flag ? userCerdentails.addOns.largeStorage.price * 10 : userCerdentails.addOns.largeStorage.price;
                    totalAmount = +userCerdentails.plan.planPrice + userCerdentails.addOns.onlineService.price + userCerdentails.addOns.largeStorage.price
                    document.querySelector(".finsinup-container").innerHTML = `
                    <div class="plan-name">
                        <div>
                            <h1>
                            ${userCerdentails.plan.planName}(${userCerdentails.plan.planSubscription})
                            </h1>
                        <button type="button" >
                            Change
                        </button>
                        </div>
                        <div class="plan-amount">
                            <span>
                            ${userCerdentails.plan.planSubscription === "montly" ? `$${userCerdentails.plan.planPrice}/mon` : `$${userCerdentails.plan.planPrice}/yr`}
                            </span>
                        </div>
                    </div>
                    <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Online service</th>
                                <th>Large storage</th>
                            </tr>
                        </thead>
                        <tbody>
                             <tr>
                                <td>$${userCerdentails.addOns.onlineService.price}${flag ? '/yr' : '/mo'}</td>
                                <td>$${userCerdentails.addOns.largeStorage.price}${flag ? '/yr' : '/mo'}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    `
                    document.querySelector(".total-price").innerHTML = `
                            <span class='text-light-gray' style="font-size:0.8rem;">
                           Total (per ${flag ? 'year' : 'month'})
                            </span>
                            <h1>
                            $${totalAmount}${flag ? '/yr' : '/mo'}
                            </h1>
                    `
                    counter++;
                    slideForm()
                    document.querySelector("[type=button]")?.addEventListener("click", () => {
                        counter = counter - 2;
                        slideForm()
                    })
                    break;
                case "finishing-up":
                    counter++;
                    slideForm()
                    console.log("userCerdentails")

                    break;
            }


        } else {
            counter--;
            slideForm()
        }
    })
})
price.forEach((priceContent, index) => {
    priceContent.textContent = "$" + montlyPlan[index] + "/mo"
})
// Particular card plan is selected  changing border color and backgroundColor
card.forEach(checkedCardPlan => {
    checkedCardPlan.addEventListener("click", () => {
        document.querySelector(".selected-card").classList.remove("selected-card")
        checkedCardPlan.classList.add("selected-card")
    })
})
// slideForm function for sliding the nextpage
const slideForm = () => {
    formContainer.forEach(slide => {
        slide.style.transform = `translateX(-${counter * 100}%)`;
    })
}
// Toggle button for slecting the plans for montly or yearly
btnToggle.addEventListener("click", (e) => {

    if (btnToggle.classList.contains("toggle-dtn-checked")) {
        btnToggle.classList.remove("toggle-dtn-checked")
        btnToggle.ariaLabel = "montly"
        btnToggle.ariaChecked = false
        montly.classList.replace("text-light-gray", "font-marine-blue")
        year.classList.replace("font-marine-blue", "text-light-gray")
        price.forEach((priceContent, index) => {
            twoMonthFree[index].textContent = ""
            priceContent.textContent = "$" + montlyPlan[index] + "/mo"
            priceContent.ariaLabel = priceContent.ariaLabel.replace("0", "")
        })
        document.querySelectorAll(".add-service").forEach((addService, index) => {
            addService.querySelector("span").textContent = addOnsMo[index]
        })
        userCerdentails.addOns.largeStorage.price = 2
        userCerdentails.addOns.onlineService.price = 1
        flag = false
    } else {
        btnToggle.classList.add("toggle-dtn-checked")
        btnToggle.ariaLabel = "Yearly"
        btnToggle.ariaChecked = true
        montly.classList.replace("font-marine-blue", "text-light-gray")
        year.classList.replace("text-light-gray", "font-marine-blue")
        price.forEach((yearlyContent, index) => {
            twoMonthFree[index].textContent = "2 months free"
            yearlyContent.textContent = "$" + yearlyPlan[index] + "/yr"
            yearlyContent.ariaLabel = yearlyContent.ariaLabel + "0"

        })
        document.querySelectorAll(".add-service").forEach((addService, index) => {
            addService.querySelector("span").textContent = addOnsYr[index]
        })
        userCerdentails.addOns.largeStorage.price = 20
        userCerdentails.addOns.onlineService.price = 10
        flag = true
    }

})
// pick add-ons customizable profile
profileChecked.addEventListener("click", e => {
    if (e.target.checked) {
        document.querySelectorAll(".add-service")[2].classList.add("add-selected")

    } else {
        document.querySelectorAll(".add-service")[2].classList.remove("add-selected")
    }
})
//

// console.log(userCerdentails.plan.planName)
// console.log(+addOnsYr[0].match(/\d/g).toString().split(",").join("") + 10)
// console.log(+"10" + 2)