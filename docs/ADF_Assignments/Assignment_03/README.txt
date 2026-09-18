ASSIGNMENT 03 — Setup (Switch by extension)
==========================================
Upload landing/inbox/* to /landing/inbox/

Expected routing:
  customers.csv      -> /bronze/csv/
  events.json        -> /bronze/json/
  audit_log.txt      -> /bronze/txt/
  scratch.tmp        -> IGNORE (Filter)
  temp_customers.csv -> IGNORE (contains 'temp')
  mystery.dat        -> /landing/quarantine/ (Switch default)

Activities: Get Metadata, Filter, ForEach, Switch, Copy
