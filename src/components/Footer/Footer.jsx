import React from 'react'
import "../Footer/Footer.scss"

const Footer = () => {
    return (
        <footer>
            <ul className="list-inline">
                <li className="list-inline-item"><a href="#">Home</a></li>
                <li className="list-inline-item"><a href="#">Services</a></li>
                <li className="list-inline-item"><a href="#">About</a></li>
                <li className="list-inline-item"><a href="#">Terms</a></li>
                <li className="list-inline-item"><a href="#">Privacy policy</a></li>
            </ul>
            <p className="copyright">ANHQV Social Network © 2022</p>
        </footer>
    )
}

export default Footer