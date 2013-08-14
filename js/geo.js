(function geoconverter() {
	var convertToGeoJson;
	var convertToEsri;
	$(document).ready(function(){
		$("#err").hide();
		$("#floating-map").hide();
		//todo
		$("#view-map-btn").hide();
		//
		convertToEsri = geoJsonConverter();
		convertToGeoJson = esriConverter();
		var out;
		$("#convert-to-arcjson-btn").click(function() {
			$("#err").hide();
			try
			{
				var parseOut = JSON.parse($("#the-geojson").val());
				out = convertToEsri.toEsri(parseOut);
				$("#out-json").val("");
				$("#out-json").val(JSON.stringify(out, undefined, 2));
			}
			catch(e)
			{
				$("#err").show();
			}
		});
		$("#view-map-btn").click(function() {
			$.post("http://services1.arcgis.com/mRXrgD3LWwGHJmpS/arcgis/rest/services/sweetpolys/FeatureServer/0/addFeatures?f=json&features=" 
				+ JSON.stringify(out.features), function(resp) {
				if (JSON.parse(resp).addResults[0].success == true) {
					//show it
					//$("#map-modal").modal();
					$("#floating-map").show();
				}
			});
		});
		$("#close-map-btn").click(function() {
			$("#floating-map").hide();
		});
		/*
		$("#convert-to-geojson-btn").click(function() {
			var out = convertToGeoJson.toGeoJson(JSON.parse($("#the-arcjson").val()));
			$("#out-json").val("");
			$("#out-json").val(JSON.stringify(out, undefined, 2));
		});
		*/
		$("#clear-results-btn").click(function() {
			$("#out-json").val("");
		});
		
	});
}())