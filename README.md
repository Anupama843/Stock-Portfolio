# Create React App for AS Portfolio

In this App, user can manage their Stock Portfolio (add, update and delete Stocks). 
I have user financial modeling prep to get the correct value of the Stocks. ("https://site.financialmodelingprep.com/"). 


## Available Scripts

In the project directory, you can run:

### `npm run build` then

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## App Usability
* User can log in with any alphanumeric username.
    * With invalid username, user will see the error message.
    * Login will fail for the username "dog" / "DOG"
    * Login button is disabled if the username field is blank
* Once user logged in, user will see a message to create portfolio by clicking `Add Stocks` button and the initial total amount will be set to zero
* Adding a Stock
    * Once user will click on the `Add Stocks`, user will be present with the model in which user need to enter the stock symbol and quantity to add it in the portfolio
    * With invalid stock symbol, user will see error message `Entered Symbol is invalid, Please try again`
* Updating a Stock
    * User can update (increase/decrease) by clicking plus or minus button on the portfolio list
    * Total value will be updated with the increment or decrement of the stock quantity
* Deleting a Stock
    * User can delete stock by click on the ` X ` button
* Description of a Stock
    * User can click on a perticular stock to get the complete detail of the stock like it Name, Price, Quantity, Day Low, Day High, volume, Market Cap and Exchange


