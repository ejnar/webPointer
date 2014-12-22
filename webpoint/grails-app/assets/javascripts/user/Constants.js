/**
 * 
 */


angular.module('userApp').constant(   
		'properties', { 
			categories: ['Worship','Christian','Hymns', 'Gospel'],
			language: ['swe','eng','dan'],
			stypes: ['TEXT', 'TEXTCHORDS'],
			test: 'value',
		});


angular.module('userApp').value( 'testkey', 'testValue');
