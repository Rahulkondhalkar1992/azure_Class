ASSIGNMENT 02 — Setup (Lookup file list + If exists + Copy)
==========================================================
Upload:
  control/files_to_process.csv  ->  /control/files_to_process.csv
  landing/orders/*              ->  /landing/orders/

Control list includes:
  orders_west.csv, orders_east.csv, orders_south.csv, orders_ghost.csv

Landing has:
  west, east, south, north
  (NO orders_ghost.csv on purpose)

Expected:
  - Copy west, east, south to /bronze/orders/yyyyMMdd/
  - ghost: exists=false → skip (do not fail pipeline)
  - north: present but NOT in control list → must NOT be copied

Activities: Lookup, ForEach, Get Metadata, If, Copy
