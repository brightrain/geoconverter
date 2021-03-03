(function geoconverter() {
	var convertToGeoJson;
	var convertToEsri;
	$(document).ready(function(){
		$("#err").hide();
		$("#geojson").val("");
		$("#arcjson").val("");
		//todo
		$("#view-map-btn").hide();
        //$("#floating-map").hide();
		//
		convertToEsri = geoJsonConverter();
		convertToGeoJson = esriConverter();
		var out;
		$("#convert-to-arcjson-btn").click(function() {
			$("#err").hide();
			try
			{
				var parseOut = JSON.parse($("#geojson").val());
				out = convertToEsri.toEsri(parseOut);
				$("#arcjson").val("");
				$("#arcjson").val(JSON.stringify(out, undefined, 2));
			}
			catch(e)
			{
				$("#err").show();
			}
		});
        $("#convert-to-geojson-btn").click(function() {
			try {
            var out = convertToGeoJson.toGeoJson(JSON.parse($("#arcjson").val()));
			$("#geojson").val("");
			$("#geojson").val(JSON.stringify(out, undefined, 2));
            }
            catch(e) {
                $("#err").show();
            }
		});
        $("#select-geojson-btn").click(function() {
			$("#geojson").select();
		});
        $("#select-arcjson-btn").click(function() {
			$("#arcjson").select();
		});
		$("#clear-geojson-btn").click(function() {
			$("#geojson").val("");
		});
		$("#clear-results-btn").click(function() {
			$("#arcjson").val("");
		});
		$("#see-arcjson-example-btn").click(function() {
			$("#arcjson-example-modal").modal();
		});
		$("#see-geojson-example-btn").click(function() {
			$("#geojson-example-modal").modal();
		});
        /*
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
        */
        $("#close-map-btn").click(function() {
			$("#floating-map").hide();
		});
	});
}())