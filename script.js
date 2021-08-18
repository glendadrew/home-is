(function() {
    "use strict";
    const mainTag = document.querySelector('main');
    const bodyTag = document.querySelector('body');
    const welcomeParticipateBtn = document.querySelector('#participate-btn');
    const welcomeViewBtn = document.querySelector('#view-btn');
    const navBtn = document.querySelector('#nav');
    const navMenu = document.querySelector('header nav');
    const headerTag = document.querySelector('header');
    const homeIsLogo = document.querySelector('header a img')
    const headerDiv = document.querySelector('#container > div');

    const tileImages = document.querySelectorAll('main img');
    const tileOverlay = document.querySelector('#tile-overlay');
    const tileImg = document.querySelector("#tile-overlay figure img");
    const zoomBtns = document.querySelectorAll('#zoom-btns button');
    const zoomOutBtn = zoomBtns[0];
    const zoomInBtn = zoomBtns[1];
    const closeBtn = document.querySelector('#tile-overlay button');
    const listElements = document.querySelectorAll('header nav li');
    const navCloseBtn = document.querySelector('#nav-close');
    const qrSticker = document.querySelector('#container > img');
    const containerDiv = document.querySelector('#container');
    const leftArrow = document.querySelectorAll('#tile-overlay > img')[0];
    const rightArrow = document.querySelectorAll('#tile-overlay > img')[1];

    const teamOverlay = document.querySelector('#team-overlay');
    const teamOverlaySection = document.querySelector('#team-overlay section');
    const teamCloseBtn = document.querySelector('#team-close-btn');
    const teamImages = document.querySelectorAll('main figure img');

    const welcomeOverlay = document.querySelector('#welcome-overlay');

    // const navLis = document.querySelectorAll('nav li');
    /* const homeIsLink = navLis[0];
    const viewLink = navLis[1]; */


    let imgTags;
    let imgInfo;
    let currentImage;
    let scrollValue = window.scrollY;
    /* let loaded = false; */

    /* let headerHeight;
    let qrStickerHeight; */

    const teamName = [
        'Ama Dadzie, Student Researcher',
        'Glenda Drew, co-PI',
        'Cozette Ellis, Student Researcher',
        'Mikaela Keung, Student Researcher',
        'Brett Snyder, co-PI',
        'Dulcinea Herse Woo, Student Researcher'

    ]

    const glendaLink = document.createElement("a");

    glendaLink.setAttribute('href', 'http://glendadrew.site/');
    glendaLink.setAttribute('target', '_blank');
    glendaLink.textContent = 'glendadrew.site.';

    const brettLink1 = document.createElement("a");
    const brettLink2 = document.createElement("a");

    brettLink1.setAttribute('href', 'http://chengsnyder.com/');
    brettLink1.setAttribute('target', '_blank');
    brettLink1.textContent = 'Cheng+Snyder';

    brettLink2.setAttribute('href', 'https://arts.ucdavis.edu/faculty-profile/brett-snyder');
    brettLink2.setAttribute('target', '_blank');
    brettLink2.textContent = 'https://arts.ucdavis.edu/faculty-profile/brett-snyder';

    const brettText = document.createElement('span');
    brettText.textContent = '. His research and work is at the intersection of architecture and graphics with a focus on developing connections between people and the environment. ';



    const teamDescription = [
        'Ama Dadzie is senior Computer Science and Design Double Major at UC Davis focusing on web design and web development. Ama has been involved in creating the Home Is website.',
        'Professor of Design at UC Davis. Her research is based at the intersections of visual culture and social change, with a particular emphasis on the working class. Her work is rooted in creating messaging with social implications. See some of her work at ',
        'Cozette Ellis is a junior Design student at UC Davis, with primary focuses in illustration, human-centered design, and graphic design. At the Placemaking initiative, Cozette has been involved with event planning and outreach, total logo redesign and development, and general graphic organization.',
        'Mikaela Keung is a senior Art Studio and Design Double Major at UC Davis with a focus in UX/UI design, motion graphics, and web design. Mikaela has been involved in creating the Placemaking website.',
        'Brett Snyder is an Associate Professor of Design and a partner in the experimental architecture and design firm ',
        'Dulcinea is a design student at UC Davis, with an emphasis on sustainability and human centered design. Dulcinea is involved with outreach, promotion, planning and coordination of events hosted by the Placemaking Initiative.'

    ]





    window.addEventListener('load', function() {
        navBtn.addEventListener('click', showNavMenu);
        /*  viewLink.addEventListener('click', function(){
             welcomeOverlay.className = 'view-display';
         })
         homeIsLink.addEventListener('click', function(){
            welcomeOverlay.className = 'landing-display';
        }) */


        if (mainTag.className == 'tiles') { /* TILES PAGE */

            /* if(!loaded) {
                 welcomeOverlay.className = 'landing-display';
            } */
            if (welcomeOverlay) {
                welcomeViewBtn.addEventListener('click', function() {
                    location.href = "tiles.html";
                    const welcomeOverlay = document.querySelector('#welcome-overlay');
                    welcomeOverlay.style.display = 'none';
                    containerDiv.style.overflow = 'initial';
                    /* loaded = true;
                    welcomeOverlay.className = 'view-display'; */
                })

                welcomeParticipateBtn.addEventListener('click', function() {
                    window.open("https://docs.google.com/forms/d/e/1FAIpQLSdSwkRE3-_cvD-W70YbJtvHuceNNj2xi8tbKbKpKnt-zUm_Pg/viewform", "_blank");
                })
            }

            leftArrow.addEventListener('click', function() {
                currentImage--;
                changePhoto()
            });

            rightArrow.addEventListener('click', function() {
                currentImage++;
                changePhoto()
            });

            /* Close tile overlay  */
            closeBtn.addEventListener('click', function() {
                tileOverlay.style.display = 'none';
                bodyTag.style.overflow = 'initial';
            })

            zoomInBtn.addEventListener('click', zoomIn);
            zoomOutBtn.addEventListener('click', zoomOut)
            imgTags = tileImages;

            imageEventListeners();

        } else if (mainTag.className == 'team') { /* TEAM */
            imgTags = teamImages;
            console.log(imgTags)

            teamCloseBtn.addEventListener('click', function() {
                teamOverlay.style.display = 'none';
                bodyTag.style.overflow = 'initial';
            })

            teamOverlay.addEventListener('click', function() {
                teamOverlay.style.display = 'none';
                bodyTag.style.overflow = 'initial';
            })
            teamOverlaySection.addEventListener('click', function(event) {
                event.stopImmediatePropagation();
            })
            imageEventListeners();
        }

    })


    window.addEventListener('scroll', function() {

        if (window.scrollY > 125 && window.scrollY >= scrollValue) {
            headerTag.style.marginTop = '-15vh';
        } else {
            headerTag.style.marginTop = '0';
        }
        scrollValue = window.scrollY;
    })

    /* Show Navigation menu */
    function showNavMenu() {

        navMenu.style.display = 'flex';
        headerDiv.style.backgroundColor = 'rgba(47, 47, 47, 0.6)';
        headerDiv.style.height = '100vh';
        headerTag.style.height = '100vh';
        containerDiv.style.overflow = 'hidden';

        if (window.innerWidth < 1300) {
            headerTag.style.paddingTop = `calc((15vh - ${parseInt(homeIsLogo.height)}px) / 2` //'50px';     calc((15vh - 48px) / 2)
            headerTag.style.alignContent = 'flex-start';


        } else {
            headerTag.style.display = 'block';
            headerTag.style.width = '50vw';
            headerTag.style.backgroundColor = '#fdfdfd';
            headerTag.style.padding = '0';

            listElements.forEach(function(eachListEl) {
                eachListEl.style.fontSize = '3.2em';
            })

            navBtn.style.marginLeft = '0';
            navCloseBtn.style.display = 'block';

        }

        navBtn.removeEventListener('click', showNavMenu);
        navBtn.addEventListener('click', hideNavMenu);
        navCloseBtn.addEventListener('click', hideNavMenu);

        setTimeout(function() {
            headerDiv.addEventListener('click', hideNavMenu);
            headerTag.addEventListener('click', function(event) {
                event.stopImmediatePropagation();
            })
        }, 500)


    }

    /* Remove Navigation menu */
    function hideNavMenu() {
        navMenu.style.display = 'none';
        navBtn.removeEventListener('click', hideNavMenu);
        navBtn.addEventListener('click', showNavMenu);
        containerDiv.style.overflow = 'initial';

        if (window.innerWidth < 1300) {
            headerTag.style.height = '15vh';
            headerTag.style.paddingTop = '0';
            headerTag.style.alignContent = 'center';
        } else {
            headerTag.style.display = 'flex';
            headerTag.style.backgroundColor = 'transparent';
            headerTag.style.width = '40%';
            headerTag.style.padding = '30px 0 0 30px';
            //    turn on hamburger menu
        }

        headerDiv.style.backgroundColor = 'transparent';
        headerDiv.style.height = 'auto';

        navCloseBtn.style.display = 'none';
        headerDiv.removeEventListener('click', hideNavMenu);

    }

    function imageEventListeners() {
        for (let i = 0; i < imgTags.length; i++) {

            imgTags[i].addEventListener('click', function() {

                if (mainTag.className == 'tiles') {
                    showTileOverlay(imgTags[i], i);
                } else {
                    showTeamOverlay(imgTags[i], i)
                }
            });
        }
    }

    /* Show tile overlay */
    function showTeamOverlay(img, num) {

        const teamImg = document.querySelector("#team-overlay section > img");
        let h3Tag = document.querySelector("#team-overlay section > h3");
        let pTag = document.querySelector("#team-overlay section > p");

        teamImg.src = img.src;
        h3Tag.textContent = teamName[num]
        pTag.textContent = teamDescription[num]

        if (num == 1) {
            pTag.appendChild(glendaLink);

        } else if (num == 4) {
            pTag.appendChild(brettLink1);
            pTag.appendChild(brettText)
            pTag.appendChild(brettLink2);
        }

        teamOverlay.style.display = 'block';

        bodyTag.style.overflow = 'hidden';


    }

    /* Show tile overlay */
    function showTileOverlay(img, num) {
        if (window.innerWidth < 1300) {
            if (headerTag.style.marginTop == '0px' || window.scrollY < 125) {
                tileOverlay.style.top = '15vh';
            } else {
                tileOverlay.style.top = '0';
            }
        }
        currentImage = num;
        tileImg.src = img.src;
        tileOverlay.style.display = 'flex';
        tileOverlay.style.height = window.innerHeight - headerTag.clientHeight;
        bodyTag.style.overflow = 'hidden';


    }

    /* Change photo to next with arrows */
    function changePhoto() {
        if (currentImage > (imgTags.length - 1)) {
            currentImage = 0;
        } else if (currentImage < 0) {
            currentImage = imgTags.length - 1;
        }

        tileImg.src = imgTags[currentImage].src;
    }


    function zoomIn() {
        getImgInfo()

        if (window.innerWidth < 1300) {
            if (imgInfo.width >= window.innerWidth / 2) {
                imgTags.forEach(function(eachImg) {
                    eachImg.style.width = '100%';
                })
            } else if (imgInfo.width <= window.innerWidth / 3) {
                imgTags.forEach(function(eachImg) {
                    eachImg.style.width = '50%';
                })
            }
        } else {
            if (imgInfo.width <= window.innerWidth / 7) {
                imgTags.forEach(function(eachImg) {
                    eachImg.style.width = '16.66%';
                })
                qrSticker.style.width = '16.66%';
            } else if (imgInfo.width <= window.innerWidth / 6) {
                imgTags.forEach(function(eachImg) {
                    eachImg.style.width = '20%';
                })
                qrSticker.style.width = '20%';
            }
        }
    }

    function zoomOut() {
        getImgInfo()

        if (window.innerWidth < 1300) {
            if (imgInfo.width <= window.innerWidth / 2) {
                console.log("in zoom out 33%")
                imgTags.forEach(function(eachImg) {
                    eachImg.style.width = '33.33%'
                })
            } else if (imgInfo.width = window.innerWidth) {
                imgTags.forEach(function(eachImg) {
                    eachImg.style.width = '50%'
                })
            }
        } else {
            if (imgInfo.width <= window.innerWidth / 6) {
                imgTags.forEach(function(eachImg) {
                    eachImg.style.width = '14.28%';
                })
                qrSticker.style.width = '14.28%';
            } else if (imgInfo.width = window.innerWidth / 5) {
                imgTags.forEach(function(eachImg) {
                    eachImg.style.width = '16.66%';
                })
                qrSticker.style.width = '16.66%';
            }
        }

    }

    /* Get image info to be able to use img width in zooming feature */
    function getImgInfo() {
        imgInfo = imgTags[0].getBoundingClientRect();
    }




})();