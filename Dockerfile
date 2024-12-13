# Use the official PHP image with Apache
FROM php:8.3-apache

# 
RUN apt-get update && apt-get install -y libpq-dev && docker-php-ext-install pgsql pdo_pgsql

# Enable Apache mod_rewrite (if needed)
RUN a2enmod rewrite

# Set the working directory
WORKDIR /var/www/html

# Copy the source code into the container
COPY . /var/www/html/

# Change ownership of the files to www-data (Apache's default user)
RUN chown -R www-data:www-data /var/www/html

# Ensure Apache can use .htaccess files by allowing overrides
RUN echo "<Directory /var/www/html>\n\
    AllowOverride All\n\
</Directory>" >> /etc/apache2/apache2.conf

# Expose the port the app will run on
EXPOSE 80

# Start Apache in the foreground
CMD ["apache2-foreground"]