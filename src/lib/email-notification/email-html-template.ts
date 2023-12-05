const ADMIN_PHONE_NO = process.env.ADMIN_PHONE_NO as string;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;
const WEBSITE_URL = process.env.WEBSITE_URL as string;

export const emailTemplate = (body: string, name = "") => `
<html>
<head>
  <style>
    h1, h2, bold {
      font-weight: 800;
      font-size: 24px;
    }

    h2 {
      font-size: 20px;
    }

    bold {
      color: #d46642;
    }

    footer {
      background-color: #a19794;
      color: #ffffff;
      text-align: center;
      padding: 20px;
      margin-top: 30px;
    }

    img {
      width: 100px;
      height: auto;
    }

    a {
      color: #fff;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
<p>Hello ${name},</p>
  <main>
  ${body}
  </main>

  <footer>
    <img src="https://res.cloudinary.com/ibraheemsulay/image/upload/v1701670813/logo_pzjrol.png" alt="1907Store Logo">

   
    <h1>1907Store</h1>
    <p>
      Phone: ${ADMIN_PHONE_NO}<br>
      Email: ${ADMIN_EMAIL}
    </p>

    <h2>1907Store is your one stop online store for all quality leather wears and accessories</h2>

    <p>
      <a href=${WEBSITE_URL}>Visit Our Website</a>
    </p>

    <p>
      Follow us on:
      <a href="#" target="_blank">Instagram</a>
      <span> | </span>
      <a href="#" target="_blank">Twitter</a>
      <span> | </span>
      <a href="#" target="_blank">Facebook</a>
    </p>
  </footer>
</body>
</html>`;
