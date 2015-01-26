/**
 * 
 */


angular.module('userApp').constant(   
		'properties', { 
			categories: ['Worship','Christian','Hymns', 'Gospel', 'Christmas carols', 'Traditional'],
			language: ['swe','eng','dan'],
			stypes: ['TEXT', 'TEXTCHORDS'],
			keys: ['C','C#','D'],
			test: 'value',
		});


angular.module('userApp').value( 'testkey', 'testValue');
