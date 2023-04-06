// import Razorpay from 'razorpay';

// function loadScript(src) {
//   return new Promise(resolve => {
//     const script = document.createElement('script');
//     script.src = src;
//     script.onload = () => {
//       resolve(true);
//     };
//     script.onerror = () => {
//       resolve(false);
//     };
//     document.body.appendChild(script);
//   });
// }

// async function displayRazorpay() {
//   const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

//   if (!res) {
//     alert('Razor Pay SDK failed to load. Are you online?')
//     return
//   }

//   try {
//     const data = await fetch('http://localhost:1337/razorpay', { method: 'POST' }).then((t) =>
//       t.json(),
//     )

//     console.log(data)

//     const options = {
//       key_id: 'rzp_test_Mhe0iWXkuICNRK',
//       key_secret: 'QQUkFPr1gqcWaUWDqcRBJocV',
//       name: 'EIPS Insight', //your business name
//       currency: data.currency,
//       amount: data.amount.toString(),
//       order_id: data.id,
//       description: 'Test Transaction for advertisements',
//       image: 'https://example.com/your_logo',
//       callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
//       prefill: {
//         name: 'Enter your name', //your customer's name
//         email: 'Your Email',
//         contact: 'COntact Number',
//       },
//       notes: {
//         address: 'Razorpay Corporate Office',
//       },
//       theme: {
//         color: '#3399cc',
//       },
//     }

//     const paymentObject = new window.Razorpay(options)
//     paymentObject.open()
//   } catch (err) {
//     console.log(err)
//   }
// }

