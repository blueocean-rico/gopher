# blueocean

## setup

### .env file
duplicate the example env file and rename to .env.local

### auth0:
go to https://manage.auth0.com
create a regular web application
in applications > settings
replace env teamplates with given keys
run command:: node -e "console.log(crypto.randomBytes(32).toString('hex'))" ::to generate secret codes
