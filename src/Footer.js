const Footer = () => {
  const today = new Date();
  return (<div id="footer">
    <p>&copy; {today.getFullYear()} Kevin Konczak</p>
    <ul className="list-inline">
      <li className="list-inline-item"><a href="https://github.com/neoke20" target="_blank" rel="noreferrer noopener"><i class="fab fa-github"></i></a></li>
      <li className="list-inline-item"><a href="https://www.linkedin.com/in/konczakkevin/" target="_blank" rel="noreferrer noopener"><i class="fab fa-linkedin"></i></a></li>
    </ul>
  </div>)
};

export default Footer;
