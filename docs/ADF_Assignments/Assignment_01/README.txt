ASSIGNMENT 01 — Setup
=====================
1. Upload EVERYTHING under landing/sales/ to your ADLS path:
   abfss://<container>@<account>.dfs.core.windows.net/landing/sales/

2. IMPORTANT for lastModified = today:
   Upload the two .csv files on the SAME DAY you run the lab
   (or re-upload them before the demo).

3. Expected pipeline behavior:
   - Copy: sales_orders_a.csv, sales_orders_b.csv
   - Ignore: sales_meta.json, readme_vendor.txt

4. Sink example: /bronze/sales/yyyy/MM/dd/
