function Square(link, imgLink) {
  return (
  <a href={link.link} aria-label="opensea link" target='_blank'>
    <div className="cell">
      {/* <img src={imgLink}></img> */}
    </div>
  </a>
  );
}

export default Square; 