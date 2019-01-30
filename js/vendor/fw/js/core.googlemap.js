function melodyschool_googlemap_init(dom_obj, coords) {
	"use strict";
	if (typeof MELODYSCHOOL_STORAGE['googlemap_init_obj'] == 'undefined') melodyschool_googlemap_init_styles();
	MELODYSCHOOL_STORAGE['googlemap_init_obj'].geocoder = '';
	try {
		var id = dom_obj.id;
		MELODYSCHOOL_STORAGE['googlemap_init_obj'][id] = {
			dom: dom_obj,
			markers: coords.markers,
			geocoder_request: false,
			opt: {
				zoom: coords.zoom,
				center: null,
				scrollwheel: false,
				scaleControl: false,
				disableDefaultUI: false,
				panControl: true,
				zoomControl: true, //zoom
				mapTypeControl: false,
				streetViewControl: false,
				overviewMapControl: false,
				styles: MELODYSCHOOL_STORAGE['googlemap_styles'][coords.style ? coords.style : 'default'],
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
		};
		
		melodyschool_googlemap_create(id);

	} catch (e) {
		
		dcl(MELODYSCHOOL_STORAGE['strings']['googlemap_not_avail']);

	};
}

function melodyschool_googlemap_create(id) {
	"use strict";

	// Create map
	MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].map = new google.maps.Map(MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].dom, MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].opt);

	// Add markers
	for (var i in MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers)
		MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[i].inited = false;
	melodyschool_googlemap_add_markers(id);
	
	// Add resize listener
	jQuery(window).resize(function() {
		if (MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].map)
			MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].map.setCenter(MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].opt.center);
	});
}

function melodyschool_googlemap_add_markers(id) {
	"use strict";
	for (var i in MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers) {
		
		if (MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[i].inited) continue;
		
		if (MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[i].latlng == '') {
			
			if (MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].geocoder_request!==false) continue;
			
			if (MELODYSCHOOL_STORAGE['googlemap_init_obj'].geocoder == '') MELODYSCHOOL_STORAGE['googlemap_init_obj'].geocoder = new google.maps.Geocoder();
			MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].geocoder_request = i;
			MELODYSCHOOL_STORAGE['googlemap_init_obj'].geocoder.geocode({address: MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[i].address}, function(results, status) {
				"use strict";
				if (status == google.maps.GeocoderStatus.OK) {
					var idx = MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].geocoder_request;
					if (results[0].geometry.location.lat && results[0].geometry.location.lng) {
						MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[idx].latlng = '' + results[0].geometry.location.lat() + ',' + results[0].geometry.location.lng();
					} else {
						MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[idx].latlng = results[0].geometry.location.toString().replace(/\(\)/g, '');
					}
					MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].geocoder_request = false;
					setTimeout(function() { 
						melodyschool_googlemap_add_markers(id); 
						}, 200);
				} else
					dcl(MELODYSCHOOL_STORAGE['strings']['geocode_error'] + ' ' + status);
			});
		
		} else {
			
			// Prepare marker object
			var latlngStr = MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[i].latlng.split(',');
			var markerInit = {
				map: MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].map,
				position: new google.maps.LatLng(latlngStr[0], latlngStr[1]),
				clickable: MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[i].description!=''
			};
			if (MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[i].point) markerInit.icon = MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[i].point;
			if (MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[i].title) markerInit.title = MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[i].title;
			MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[i].marker = new google.maps.Marker(markerInit);
			
			// Set Map center
			if (MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].opt.center == null) {
				MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].opt.center = markerInit.position;
				MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].map.setCenter(MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].opt.center);				
			}
			
			// Add description window
			if (MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[i].description!='') {
				MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[i].infowindow = new google.maps.InfoWindow({
					content: MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[i].description
				});
				google.maps.event.addListener(MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[i].marker, "click", function(e) {
					var latlng = e.latLng.toString().replace("(", '').replace(")", "").replace(" ", "");
					for (var i in MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers) {
						if (latlng == MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[i].latlng) {
							MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[i].infowindow.open(
								MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].map,
								MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[i].marker
							);
							break;
						}
					}
				});
			}
			
			MELODYSCHOOL_STORAGE['googlemap_init_obj'][id].markers[i].inited = true;
		}
	}
}

function melodyschool_googlemap_refresh() {
	"use strict";
	for (id in MELODYSCHOOL_STORAGE['googlemap_init_obj']) {
		melodyschool_googlemap_create(id);
	}
}

function melodyschool_googlemap_init_styles() {
	// Init Google map
	MELODYSCHOOL_STORAGE['googlemap_init_obj'] = {};
	MELODYSCHOOL_STORAGE['googlemap_styles'] = {
		'default': []
	};
	if (window.melodyschool_theme_googlemap_styles!==undefined)
		MELODYSCHOOL_STORAGE['googlemap_styles'] = melodyschool_theme_googlemap_styles(MELODYSCHOOL_STORAGE['googlemap_styles']);
}