require([
      "esri/Map",
      "esri/layers/FeatureLayer",
      "esri/views/MapView",
      "dojo/domReady!"
    ], function(
      Map,
      FeatureLayer,
      MapView
    ) {

      // Create the map
      var map = new Map({
        basemap: "gray"
      });

      // Create the MapView
      var view = new MapView({
        container: "viewDiv",
        map: map,
        center:[-90.1994, 38.6270],
        zoom: 12
      });

      /*************************************************************
       * The PopupTemplate content is the text that appears inside the
       * popup. {fieldName} can be used to reference the value of an
       * attribute of the selected feature. HTML elements can be used
       * to provide structure and styles within the content. The
       * fieldInfos property is an array of objects (each object representing
       * a field) that is use to format number fields and customize field
       * aliases in the popup and legend.
       **************************************************************/

      var template = { // autocasts as new PopupTemplate()
        title: "Neighborhood: {NHD_NAME}",
        content: [{
          // It is also possible to set the fieldInfos outside of the content
          // directly in the popupTemplate. If no fieldInfos is specifically set
          // in the content, it defaults to whatever may be set within the popupTemplate.
          type: "fields",
          fieldInfos: [{
            fieldName: "NHD_NUM",
            label: "Neighborhood Number: ",
            visible: true
          }, {
            fieldName: "NHD_NAME",
            label: "Neighborhood Name: ",
            visible: true,
            format: {
              digitSeparator: true,
              places: 0
            }
          },  {
            fieldName: "Shape__Area",
            label: "Neighborhood Size:",
            visible: true,
            format: {
              digitSeparator: true,
              places: 0
            }
          },
                      ]
        }]
      };

     var symbol = {
      type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWJYkaSBe7uMEEA5utnbzCW5YJLdZW4n-Ffg&usqp=CAU",
      width: "40px",
      height: "40px"
};
  var renderer = {
      type: "simple",  // autocasts as new SimpleRenderer()
      symbol: symbol
    };
  
      // Reference the popupTemplate instance in the
      // popupTemplate property of FeatureLayer
      var featureLayer = new FeatureLayer({
        url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/ArcGIS/rest/services/STL_Neighborhood/FeatureServer/0",
        outFields: ["*"],
        popupTemplate: template,
        renderer:renderer
      });
  
      map.add(featureLayer);
  
    });

