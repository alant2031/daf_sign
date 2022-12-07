const setUrl = ({ name, phone, email }) => {
  const nameValues = name.split(" ");

  const [user, domain] = email.split("@");

  const baseUrl = `https://quickchart.io/qr?text=BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3A${nameValues[0]}%3B${nameValues[1]}%0ATEL%3BWORK%3BVOICE%3A${phone}%0ATEL%3BCELL%3AMobile%0ATEL%3BCELL%3AMobile%0ATEL%3BCELL%3AMobile%0ATEL%3BFAX%3A%0AEMAIL%3BWORK%3BINTERNET%3A${user}%40${domain}%0AEND%3AVCARD`;

  return baseUrl;
};

document.addEventListener("DOMContentLoaded", () => {
  const nameField = document.getElementById("name");
  const roleField = document.getElementById("role");
  const phoneField = document.getElementById("phone");
  const phoneEl = document.getElementsByClassName("flex-fields")[0];
  const sepEl = document.getElementById("sep");
  const emailField = document.getElementById("email").children[0];
  const addrField = document.getElementById("address");
  const imgQR = document.getElementById("qrcode");
  const loading = document.getElementsByClassName("transform")[0];

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      if (imgQR.src !== "") {
        document.removeEventListener("keypress", onKeyPress);
      }

      [nameField, roleField, emailField, phoneField, addrField].forEach(
        (el) => {
          el.contentEditable = false;
        }
      );

      const source = setUrl({
        name: nameField.textContent,
        phone: phoneField.textContent,
        email: emailField.textContent,
      });
      loading.style.display = "";
      setTimeout(() => {
        imgQR.src = source;
        imgQR.alt = "QRCODE";
        imgQR.style.display = "";

        phoneEl.style.bottom = "4vh";
        sepEl.style.width = "74vw";

        addrField.style.top = "30vh";
        phoneField.style.marginBottom = "20px";
        loading.remove();
      }, 2550);
    }
  };
  document.addEventListener("keypress", onKeyPress);
});
