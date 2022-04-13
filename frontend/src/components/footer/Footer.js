import {FaFacebook, FaInstagram, FaTwitter, FaGithub} from "react-icons/fa";
import css from "./FooterStyle.module.css";

export default function Footer() {
    return (
        <footer className={css.footer}>
            <a>
                <FaFacebook/>
            </a>
            <a>
                <FaInstagram/>
            </a>
            <a>
                <FaTwitter/>
            </a>
            <a>
                <FaGithub/>
            </a>
            <h6>Copyright © 2022 Suzu</h6>
        </footer>
    )
}