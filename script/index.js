const fact = (num, result) => {
    if (num === 1) {
        result.innerHTML += num + ' = '
        return num
    }
    else {
        result.innerHTML += num + ' * '
        return num * fact(num - 1)
    }
}

const closeResult = () => {
    $(function () {
        $('#result').animate({
            height: '0'
        }, 2000)
    })
}

const calculateFactorial = e => {
    const result = document.querySelector("#result-header")
    const input = document.querySelector("#factorial-input")

    if (input === null) {
        $(function () {
            if ($('#result').styles.height === 0) {
                $('#result').animate({
                    height: 'auto'
                }, 2000)
            }
        })
        result.innerHTML += fact(8, result)
    } else if (parseInt(input) < 0) {
        alert("Please Enter A Non Negative Number")
    } else {
        $(function () {
            if ($('#result').styles.height === 0) {
                $('#result').animate({
                    height: 'auto'
                }, 2000)
            }
        })
        result.innerHTML += fact(num, result)
    }

    e.preventDefault()
}

