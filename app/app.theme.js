margPhotos.config( function( $mdThemingProvider ) {

	$mdThemingProvider.definePalette('instagramPalettePrimary', {
		'50': '125788',
		'100': '125788',
		'200': '4880A7',
		'300': '4880A7',
		'400': '4880A7',
		'500': '2B6B99',
		'600': '2B6B99',
		'700': '2B6B99',
		'800': '08446E',
		'900': '08446E',
		'A100': '08446E',
		'A200': '043355',
		'A400': '043355',
		'A700': '043355',
		'contrastDefaultColor': 'light',    	                                    
		'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
		'contrastLightColors': undefined    
	});

	$mdThemingProvider.definePalette('instagramPaletteAccent', {
		'50': '125788',
		'100': '125788',
		'200': '4880A7',
		'300': '4880A7',
		'400': '4880A7',
		'500': '2B6B99',
		'600': '2B6B99',
		'700': '2B6B99',
		'800': '08446E',
		'900': '08446E',
		'A100': '08446E',
		'A200': '043355',
		'A400': '043355',
		'A700': '043355',
		'contrastDefaultColor': 'light',    	                                    
		'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
		'contrastLightColors': undefined    
	});

    $mdThemingProvider.theme('default')
                      .primaryPalette('instagramPalettePrimary')
                      //.accentPalette('deep-orange')
                      .accentPalette('instagramPaletteAccent', {'default': '500'})
                      .warnPalette('grey');
});