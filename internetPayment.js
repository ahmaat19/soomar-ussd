import XMLHttpRequest from 'xhr2'

const paymentInternetRequest = (obj) => {
  var data = btoa(JSON.stringify(obj))

  const xhttp = new XMLHttpRequest()

  xhttp.onload = (res) => {
    paymentInternetResponse(res?.currentTarget?.responseText)
  }

  xhttp.open('POST', `https://soomar.so/m/payment/DataPy.php`)
  xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhttp.send('data=' + data)
}

const obj = {
  lacagta: '0.1',
  dire: '615301507',
  loodire: '615301507',
  shirkada: 'Hormuud',
  nooca: 'Anfac Hadal',
  OfferID: 'NA',
  usercity: 'mogadisho',
  SoomarDataDealeryCash: '615301507',
}

const paymentInternetResponse = (res) => res

paymentInternetRequest(obj)


