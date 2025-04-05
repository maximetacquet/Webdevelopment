const setup = () => {
    const vandaag = new Date();
    const verjaardag = new Date('December 30,2006 19:55:00')
    const aantalDagen = (vandaag-verjaardag)/1000/60/60/24
    console.log(Math.floor(aantalDagen))
}
window.addEventListener("load", setup);