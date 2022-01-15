const Footer = () => {
  const today = new Date();
  return (<div>
    <p>&copy; {today.getFullYear()} Kevin Konczak</p>
  </div>)
};

export default Footer;
