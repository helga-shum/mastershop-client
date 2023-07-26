import React from "react";
import Line from "../line";
import styles from "./footer.module.css";


const Footer = () => {
  return (
    <footer className={styles.footer} id="footer">
      <Line />

      <div className={styles.messengers}>
        <p>Do you have any questions?</p>
        <h2>Write to us in any messenger convenient for you</h2>
      </div>
      <div className={styles.icons}>
        <button>
          <a
            href="#"
            target="_blank"
          >
            <img src="/icons/socialIcons/discord.svg" alt="discord" />
          </a>
        </button>

        <button>
          <a href="#" target="_blank">
            <img src="/icons/socialIcons/telegram.svg" alt="telegram" />
          </a>
        </button>
        <button>
          <a href="#" target="_blank">
            <img src="/icons/socialIcons/whatsApp.svg" alt="whatsApp" />
          </a>
        </button>
      </div>
      <Line />
      <div className={styles.messengers}>
        <h2>Or contact by phone/mail</h2>
        <div className={styles.contact}>
          <p>Phone: +48 000 000 00 00</p>
          <p>Email: master.shop2023@gmail.com</p>
        </div>
      </div>
      <Line />
      <div className={styles.copyright}>© 2023 created by Olha. S.</div>
    </footer>
  );
};

export default Footer;
