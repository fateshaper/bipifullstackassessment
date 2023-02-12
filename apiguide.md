5 GraphQL operations were created for the assessment. Refer to graphiql to for more information on their datatypes

Database columns :
id : Unique ID of merchant [int]
merchant_name : Merchant name [string]
phone_number : Merchant phone number [string]
latitude : Merchant latitude [decimal]
longitude : Merchant longitude [decimal]
is_active : Merchant active status [boolean]
created_at : Record creation date/time [DateTime]
updated_at : Record last updated date/time  [DateTime]

Query APIs : 
    1) merchants
        Description : List of merchants, paginated and sorted based on column
        Args : 
            - perPage :  Number of queries per page
            - currentPage : Page number
            - column : Column for the merchants list to be sorted on. Refer above for column names
            - order : 'asc' or 'desc' for ascending/descending sorting respectively
        Returns : 
            - List of all merchants
    
    2) merchant
        Description : "A single merchant, searched via id"
        Args : 
            - id : id of merchant being queried
        Returns : 
            - All columns of merchant queried

Mutate APIs :
    1) addMerchant 
        Description : "Create a new merchant"
        Args : 
            - merchant_name:  Name of merchant. 
            - phone_number: Phone number of merchant
            - latitude: Latitude of merchant
            - longitude: Longitude of merchant
            - is_active : true/false. Defaults to false if not supplied as an arg. 
        Returns : 
            - All columns of created merchant 

    2) updateMerchant 
        Description : "Update an existing merchant's information"
        Args : 
            - id : Id of merchant to be updated
            - merchant_name:  Updated name of merchant. 
            - phone_number: Updated phone number of merchant
            - latitude: Updated latitude of merchant
            - longitude: Updated longitude of merchant
            - is_active : Updated active status 
        Returns : 
            - All columns of updated merchant 

    3) toggleActive 
        Description : "Bulk toggle merchants is_active status"
        Args : 
            - startid : Lower range (inclusive) of merchant ID's to be toggled 
            - endid:  Upper range (inclusive) of merchant ID's to be toggled
            Example : startid : 10, endid: 20 - all merchants with ID's from 10 (inclusive) to 20 (inclusive) will have their is_active statuses toggled (ie. true to false, false to true)
        Returns : 
            - All merchants that have their active status toggled/updated