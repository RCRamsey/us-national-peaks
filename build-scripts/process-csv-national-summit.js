
// import require packages
const fs = require("fs");
const csv = require("csvtojson");
const chalk = require("chalk");
const gjv = require("geojson-validation");

//declare variables to access file paths and attribute to filter for
const inFilePath = __dirname + "/../project-files/NationalFile/NationalFile_20210825.txt";
const outFilePath = __dirname + "/../data/us-summit.json";
const filteredFeature = "Summit";

csv({
    delimiter: "|"
  })
    .fromFile(inFilePath)
    .then(jsonObj => {
      //console.log(jsonObj);
      jsonToGeoJson(jsonObj);
    });
  

    // using native java script to convert JSON to GeoJSON
    function jsonToGeoJson(jsonObj) {
        // function will loop through the JSON object
        // and construct a GeoJSON object retaining
        // desired data attributes (e.g., feature name)

        // geojson structure
        const geojson = {
          type: "FeatureCollection",
          features: []
        };

        let feature; // declaring the variable here is better
        // than repeatedly re-declaring within the
        // loop below
        let featureCount = 0; // counter variable to keep track below

        jsonObj.forEach(obj => {
            if (obj.FEATURE_CLASS === filteredFeature) {
                // build a GeoJSON feature for each
                // following the GeoJSON specification (i.e., lon, lat)
                feature = {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [+obj.PRIM_LONG_DEC, +obj.PRIM_LAT_DEC]
                    },
                    
                    properties: {
                        FEATURE_NAME: obj.FEATURE_NAME
                    }
                };
                // push the feature into the features array
                geojson.features.push(feature);
                featureCount++;
            }
        });
          
        console.log(
            chalk.green(
                `${featureCount} "${filteredFeature}" features filtered from CSV file`
             )// 70669 "summit" features filtered from CSV file
        ); 

        validateGeoJson(geojson); //call to validate function
    }// end jsonToGeoJson() function
      
      function validateGeoJson(geojson) {
        // function will validate GeoJSON structure
        // check to see if the GeoJSON is valid
        if (gjv.valid(geojson)) {
            console.log(chalk.green("this is valid GeoJSON!"));
            writeToFile(geojson); //call to write to file function
        } else {
            console.log(chalk.red("Sorry, not valid GeoJSON."));
        }
      }// end validateGeoJson()function
      
      function writeToFile(geojson) {
        // code here
        fs.writeFile(outFilePath, JSON.stringify(geojson), "utf-8", err => {
            if (err) throw err;
            console.log(chalk.green("done writing file"));
          });
      }// end writeToFile()function

      //run this js in command module with node/npm
      //reference newly resulting output file and confirm in geojson.io

      