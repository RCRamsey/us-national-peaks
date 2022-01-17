# us-national-peaks
## Practice utilizing turf.js library using US National Peak Data

- Write build script to pull data from website (csv to json to geojson)

- Initializing npm and installing npm packages
In Command Prompt initialize npm   
    ```bash 
    npm init
    ```  
- Confirm package.json created for npm 

- Revise description of package.json as needed

- Install four npm packages:
    ```bash
    npm install @turf/turf
    npm install chalk
    npm install csvtojson
    npm install geojson-validation
    ```
- Confirm *node_modules* for dependencies were pulled and included in *.gitignore*

- Downgrade chalk dependency to 4.1.2 (latest version 5.0 throws require error as is now ESM)

- Run build script from within build-script folder to create us-summit.json within data folder.     
    ```bash
    node process-csv-national-summit.js
    ```  
    Command Prompt Response  

    ![node-summit-response-in-command-prompot](graphics/node-summit-response-command-prompt.png)*Node summit response in command prompt*  
    
    

