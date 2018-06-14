const sgMail = require('@sendgrid/mail')
const _ = require('lodash')
const KEYS = require('../config')

sgMail.setApiKey(KEYS.SENDGRID_API_KEY)
sgMail.setSubstitutionWrappers('{{', '}}')

module.exports = (email, total) => {
  const msg = {
    to: email,
    from: 'shopping@gmail.com',
    subject: "Anne's Handmade - Purchase",
    templateId: 'e4ada337-e250-4c93-87c6-7feabf0bf0b9',
    substitutions: {
      total
    }
  }
  sgMail.send(msg)
}

// const generateHTML = (products, quantity, total) => {
//   const productRows = products.map(
//     (p, i) =>
//       `<tr>
//         <td class='left'>${p.title}</td>
//         <td class='right'>${quantity[i]}</td>
//         <td class='right'>$ ${parseFloat(
//           (p.price * quantity[i]).toFixed(2)
//         )}</td>
//      <tr>`
//   )
//   return `<html>
//       <head>
//         <style>
//           table {
//             width: 80%;
//             margin: 5vh 10vw;
//             border-collapse: collapse;
//             font-size: 1.15rem;
//           }

//           th, td {
//             border: 1px solid #dddddd;
//             padding: 2px;
//           }

//           .left {
//             text-align: left;
//           }

//           .right {
//             text-align: right;
//           }
//         </style>
//       </head>
//       <body>
//         <div style="background-image: url('https://drive.google.com/file/d/1uanpjnG1S-B19Y6Q5cLajlOSZ55HZziQ/view?usp=sharing');
//           height: 50%; width: 50%;"></div>
//         <hr/>
//         <div>
//           <h1>Thank You for shopping at Anne's Handmade !</h1>
//           <h2>We appreciate your business</h2>
//         </div>
//         <hr/>
//         <div>
//           <h3>Order Summary</h3>
//           <table>
//             <tr>
//               <th class='left'>Product</th>
//               <th class='right'>Quantity</th>
//               <th class='right'>Price</th>
//             </tr>
//               ${_.join(productRows, ' ')}
//             <tr>
//               <td></td>
//               <th>Total</th>
//               <td class='right'>$ ${total}</td>
//             </tr>
//           </table>
//           <hr/>
//         </div>
//       </body>
//     </html>`
// }

// module.exports = (email, products, quantity, total) => {
//   const msg = {
//     to: email,
//     from: 'shopping@gmail.com',
//     subject: 'Order Summary',
//     text: 'Hello plain world!',
//     html: generateHTML(products, quantity, total)
//   }

//   return sgMail.send(msg)
// }
