import XMLHttpRequest from 'xhr2'

export const internetPayment = (obj) => {
  var data = btoa(JSON.stringify(obj))

  const xhttp = new XMLHttpRequest()

  xhttp.onload = (result) => {
      const status = result?.currentTarget?.responseText
      console.log("status: ", status)
  }

  xhttp.open('POST', `https://soomar.so/m/payment/DataPy.php`)
  xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhttp.send('data=' + data)
}

