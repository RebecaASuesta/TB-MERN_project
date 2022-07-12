import React from 'react'
import "../Footer/Footer.scss"

const Footer = () => {
    return (
        <footer>
            <ul className="list-inline">
                <li className="list-inline-item"><a href="/">Principal</a></li>
                <li className="list-inline-item"><a href="#">Servicios</a></li>
                <li className="list-inline-item"><a href="#">Sobre nosotros</a></li>
                <li className="list-inline-item"><a href="#">Términos</a></li>
                <li className="list-inline-item"><a href="#">Política de privacidad</a></li>
            </ul>
            <p className="copyright">ANHQV Social Network © 2022</p>
        </footer>
    )
}

export default Footer