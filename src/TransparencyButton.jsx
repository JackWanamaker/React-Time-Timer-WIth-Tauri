function returnCrossedOut() {
    return (
        <svg width="30px" height="30px" fill="#ffffff" stroke="#000000" paintOrder="stroke" strokeWidth="2" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
 <path d="m23.055 8.906c0.557 0 1.008 0.451 1.008 1.008l-1.827 20.093c0 0.557-0.451 1.008-1.008 1.008h-10.457c-0.557 0-1.008-0.451-1.008-1.008l-1.825-20.093c0-0.557 0.451-1.008 1.008-1.008h9.01l1.066-5.436 4.839-2.485-0.348 1.298-3.592 1.801-0.938 4.822h4.072zm-5.541 7.055h4.029l-1.134 13.038h-8.818l-1.134-13.038h6.029l1.259-6.047h-8.8l1.826 20.093h10.456l1.827-20.093h-4.282l-1.258 6.047z"/>
 <path d="m0.47213 0.58445h7.9516l23.102 31.039h-7.9516z" fill="#fff" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width=".83205" aria-label="\"/>
</svg>
    )
}

function returnNormal() {
    return (
        <svg fill="#ffffff" stroke="#000000" paintOrder="stroke" strokeWidth="2" width="30px" height="30px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.055 8.906c0.557 0 1.008 0.451 1.008 1.008l-1.827 20.093c0 0.557-0.451 1.008-1.008 1.008h-10.457c-0.557 0-1.008-0.451-1.008-1.008l-1.825-20.093c0-0.557 0.451-1.008 1.008-1.008h9.010l1.066-5.436 4.839-2.485-0.348 1.298-3.592 1.801-0.938 4.822h4.072zM17.514 15.961h4.029l-1.134 13.038h-8.818l-1.134-13.038h6.029l1.259-6.047h-8.8l1.826 20.093h10.456l1.827-20.093h-4.282l-1.258 6.047z"></path>
        </svg>
    )
}

function handleButton(isTransparent) {
    if (isTransparent) {
        return returnNormal()
    }
    else {
        return returnCrossedOut()
    }
}

const TransparencyButton = ({isTransparent, setIsTransparent}) => {
    
    function handleTransparency() {
        const value = getComputedStyle(document.documentElement).getPropertyValue('background-color').trim();

        console.log(value);
        if (value === "rgba(0, 0, 0, 0)") {
            console.log("1")
            document.documentElement.style.setProperty('background-color', "#1B1B1B");
            setIsTransparent(false);
        }
        else {
            console.log("2")
            document.documentElement.style.setProperty('background-color', "transparent");
            setIsTransparent(true);
        }
    }
    
    return (
        <button onClick={handleTransparency} className="settings-button">
            {handleButton(isTransparent)}
        </button>
    )
}

export default TransparencyButton