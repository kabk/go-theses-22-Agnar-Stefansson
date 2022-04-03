$( document ).ready( function( ) {

    const rellax = new Rellax('.rellax', { center: true } );

	// Get the navbar
	const navbar = document.getElementById( 'navbar' );
	const page = document.getElementById( 'page' );

	// var subtitle = document.getElementId("subtitle");

	// Get the offset position of the navbar
	const sticky = page.offsetTop;

	const chapters = document.querySelectorAll( '.chapter' );
	

	function updateScroll( ) {

		// footnotes only turn (in)visible while scrolling on smaller screens (<= 773px)
		if ( window.innerWidth <= 1000 ) {

			// determine which chapter is scrolling into view
			let activechapter = -1;
	
			chapters.forEach( function( chapter ) {
				const chapter_rect = chapter.getBoundingClientRect( );
				
				if ( chapter_rect.top <= window.innerHeight )
					activechapter = chapter;

				
				const chapter_footnotes = chapter.querySelector( ':scope .footnotes' );
				chapter_footnotes.style.display = 'none';
			} );

			if ( activechapter != -1 ) {

				// filter footnotes here
				const anchors = activechapter.querySelectorAll( ':scope a[href^="#fn"]' );
				let num_visible_anchors = 0;
				
				anchors.forEach( function( anchor ) {
				
					// STYLES FOR TESTING PURPOSES
// 					anchor.style.paddingLeft = '10px';
// 					anchor.style.paddingRight = '10px';
// 					anchor.style.fontSize = '40px';
// 					anchor.style.color = 'white';
// 					anchor.style.backgroundColor = 'red';
				
					const anchor_rect = anchor.getBoundingClientRect( );
  
					// get footnote
					const footnoteid = anchor.attributes.href.value;
					const footnote = activechapter.querySelector( ':scope .footnote' + footnoteid );

					// check if footnote exists
					if ( footnote ) {
					
						// check if anchor is in view
						if ( anchor_rect.top < window.innerHeight - 76.5
						  && anchor_rect.bottom >= navbar.offsetHeight ) {
							footnote.style.display = 'inline-block';
						
							num_visible_anchors ++;
						} else {
							// if invisible hide matching footnote
							footnote.style.display = 'none';
						}
					}
				} );
				
				// only show footnotebar if there's footnotes visible
				if ( num_visible_anchors > 0 ) {
				
					// show footnotebar for active chapter
					const footnotebar = activechapter.querySelector( ':scope .footnotes' );
					footnotebar.style.display = 'block'; 
				}
			}
			
		} else {
		
			// if screenwidth >= 780px,
			// get and show all footnotebars and footnotes
			
			const footnotebars = document.querySelectorAll( '.footnotes' );
			footnotebars.forEach( function( footnotebar ) {
			
				// display all footnotes
				const footnotes = footnotebar.querySelectorAll( ':scope .footnote' );
				
				footnotes.forEach( function( footnote ) {
					footnote.style.display = 'inline-block';
				} );
				
				//display footnotebar
				footnotebar.style.display = 'inline-block';
			
			} );
		}	
		
		// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position

		if ( window.pageYOffset >= sticky ) {
			navbar.classList.add("sticky");

			document.getElementById("navbar").innerHTML = 
			'<a href="#c1"><strong>I</strong></a> <a href="#c2"><strong>II</strong></a> <a href="#c3"><strong>III</strong></a> <a href="#c4"><strong>VI</strong></a>';
			
			// subtitle.classList.add("sticky");

		} else {
			navbar.classList.remove("sticky");

			document.getElementById("navbar").innerHTML = 
			'<ul> <li><a href="#intro">Intro</a></li> <li><a href="#c1"><strong>I</strong> <br> Does it compute?</a></li> <li><a href="#c2"><strong>II</strong> <br> Seeing a Pattern</a></li> <li><a href="#c3"><strong>III</strong> <br> This is not a rose</a></li> <li><a href="#c4"><strong>VI</strong> <br> A rose is a rose is a rose</a></li> <li><a href="#Bibliography">Bibliography</a></li> </ul>';

			// subtitle.classList.remove("sticky");
		}
	}
	
	// When the user scrolls the page, execute updateScroll
	window.onscroll = updateScroll;

// 	const current = 0;
// 	for (var i = 0; i < document.links.length; i++) {
// 		if (document.links[i].href === document.URL) {
// 			current = i;
// 		}
// 	}
// 	
// 	document.links[current].className = 'current';
} );