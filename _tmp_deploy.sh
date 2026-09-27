#!/bin/sh
cid=$(docker ps -q --filter name=gl39bgsgp8dzfkid86gtnnae | head -1)
docker exec "$cid" grep -n "supplier-province" /var/www/html/resources/views/backend/supply/suppliers/index.blade.php
docker exec "$cid" grep -n "when(\$provinceId" /var/www/html/app/Http/Controllers/Admin/Supply/SupplySupplierController.php
