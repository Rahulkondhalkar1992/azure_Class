ASSIGNMENT 06 — Setup (Metadata-driven folders — NO watermark)
==============================================================
Upload:
  control/ingest_config.csv -> /control/ingest_config.csv
  landing/customers/*       -> /landing/customers/
  landing/products/*        -> /landing/products/
  landing/returns/*         -> /landing/returns/

Config:
  customers  IsActive=Y  pattern=.csv  -> bronze/customers/yyyy/MM/dd/
  products   IsActive=Y  pattern=.csv  -> bronze/products/yyyy/MM/dd/
  returns    IsActive=N  -> SKIP entire folder

Also skip customers_meta.json (pattern is .csv only).

Activities: Lookup, Filter, ForEach, Get Metadata, Copy
(Nested ForEach or Filter for files inside each folder)
